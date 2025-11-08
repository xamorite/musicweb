// app/profile/page.js
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth"; // Imports user state and logout
import { useApi } from "../../lib/api"; // Imports the secure data fetching utility
import {
  MusicNoteIcon,
  PencilIcon,
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

// Dummy Components for a working example (Unchanged)
const ArtistCircle = ({ artist }) => (
  <div className="flex flex-col items-center flex-shrink-0 w-24">
    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-gray-400">
      <UserCircleIcon className="w-8 h-8" />
    </div>
    <p className="mt-2 text-sm text-white truncate w-full text-center">
      {artist.name}
    </p>
  </div>
);

const TrackRow = ({ track, index }) => (
  <div className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition-colors">
    <span className="text-gray-400 w-6 text-center text-sm">{index + 1}</span>
    {/* <MusicNoteIcon className="w-5 h-5 text-gray-400 mx-3" /> */}
    <div className="flex-grow">
      <p className="text-white font-medium truncate">{track.title}</p>
      <p className="text-gray-400 text-sm">{track.artist}</p>
    </div>
  </div>
);

const gradientColors = [
  "from-blue-600 to-blue-900",
  "from-green-600 to-green-900",
  "from-purple-600 to-purple-900",
  "from-red-600 to-red-900",
  "from-yellow-600 to-yellow-900",
  "from-amber-800 to-amber-950",
  "from-pink-600 to-pink-900",
];

const Profile = () => {
  const router = useRouter();
  const { user, isAuthReady, logout } = useAuth();
  const { fetchAuthenticatedData } = useApi();

  const [profileDetails, setProfileDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [headerGradient, setHeaderGradient] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthReady && user === null) {
      router.push("/login");
    }
  }, [isAuthReady, user, router]);

  const updateProfile = () => {
    router.push("/bio");
  };

  useEffect(() => {
    // --- FIXED: Removed '&& user.id' condition ---
    // We only check if the user is authenticated and the session is ready.
    if (isAuthReady && user) {
      const fetchProfile = async () => {
        setIsLoading(true);
        setError(null);

        const randomGradient =
          gradientColors[Math.floor(Math.random() * gradientColors.length)];
        setHeaderGradient(randomGradient);

        try {
          // --- FIXED: Changed endpoint to the secure, token-based path ---
          // Your UserController has a GET /api/user/profile endpoint.
          const endpoint = `/user/profile`;

          const data = await fetchAuthenticatedData(endpoint);

          const detailedData = {
            ...user, // Start with basic user data (id, email, name)
            ...data, // Overlay with detailed data from API (fullName, bio, profilePictureUrl)
            // Ensure fullName is set, prioritizing the API response
            fullName: data.fullName || user.name || user.email,
            bio: data.bio || "Music lover, sound explorer, and groove finder.",
            profilePictureUrl:
              data.profilePictureUrl ||
              "https://placehold.co/128x128/374151/ffffff?text=U",
            // Note: topArtists/topTracks are not returned by the backend, so dummy data is necessary
            topArtists: data.topArtists || [
              { name: "Artist A" },
              { name: "Artist B" },
              { name: "Artist C" },
            ],
            topTracks: data.topTracks || [
              { title: "Track 1", artist: "Artist X" },
              { title: "Track 2", artist: "Artist Y" },
            ],
          };

          setProfileDetails(detailedData);
        } catch (err) {
          console.error("Failed to fetch profile:", err);
          if (err.message && !err.message.includes("Session expired")) {
            setError(err.message || "Failed to load profile data.");
          }
        } finally {
          setIsLoading(false);
        }
      };

      fetchProfile();
    }
  }, [isAuthReady, user, fetchAuthenticatedData]);

  if (!isAuthReady || user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white w-full">
        <p className="text-xl">
          {!isAuthReady ? "Loading session..." : "Redirecting to login..."}
        </p>
      </div>
    );
  }

  if (isLoading || !profileDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white w-full">
        <p className="text-xl">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white w-full p-4">
        <p className="text-xl text-red-500 mb-4">Error Loading Profile</p>
        <p className="text-gray-400 text-center">{error}</p>
        <button
          onClick={() => router.push("/home")}
          className="mt-6 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const profile = profileDetails;

  return (
    <div className="w-full lg:w-[80vw] mx-auto text-white pb-20">
      {/* ... (rest of the component structure remains the same) ... */}
      <div
        className={`h-80 relative bg-gradient-to-t ${headerGradient} rounded-b-xl shadow-2xl`}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        <div className="absolute bottom-0 left-0 p-6 md:p-8 flex items-end w-full">
          <img
            src={profile.profilePictureUrl}
            alt={`${profile.fullName}'s profile`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/128x128/374151/ffffff?text=U";
            }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-900 shadow-xl"
          />

          <div className="ml-6 flex-grow min-w-0">
            <p className="text-sm font-semibold text-gray-300">Profile</p>
            <h1 className="text-4xl md:text-6xl font-extrabold truncate">
              {profile.fullName || profile.email}
            </h1>
            <p className="text-sm text-gray-300 mt-1 truncate">{profile.bio}</p>
          </div>

          <div className="flex space-x-3 absolute top-6 right-6">
            <button
              onClick={updateProfile}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white"
              aria-label="Edit Profile"
            >
              <PencilIcon className="w-6 h-6" />
            </button>
            <button
              onClick={logout}
              className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors text-white"
              aria-label="Logout"
            >
              <PowerIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Your top artists
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Based on your recent listening
          </p>

          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {profile.topArtists && profile.topArtists.length > 0 ? (
              profile.topArtists.map((artist, index) => (
                <ArtistCircle key={index} artist={artist} />
              ))
            ) : (
              <p className="text-gray-500">No top artists data available.</p>
            )}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Top tracks this month
          </h2>
          <p className="text-sm text-gray-400 mb-4">Only visible to you</p>

          <div className="space-y-2">
            {profile.topTracks && profile.topTracks.length > 0 ? (
              profile.topTracks.map((track, index) => (
                <TrackRow key={index} track={track} index={index} />
              ))
            ) : (
              <p className="text-gray-500">No top tracks data available.</p>
            )}
          </div>
          {profile.topTracks && profile.topTracks.length > 0 && (
            <button className="mt-6 text-gray-400 text-sm hover:text-white transition-colors">
              Show all
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
