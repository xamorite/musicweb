// app/home/page.js
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth";
import useFetchTracks from "../hooks/useFetchTracks";
// Import necessary components (assuming you'll create these)
import Sidebar from "../components/sidebar"; // Placeholder for the fixed left nav
import TopSearchHeader from "../components/topSearchHeader"; // Placeholder for the top search bar
import NewArrival from "../components/newArrival"; // Reusing the existing component for the large banner spot
import TrackCard from "../components/trackCard"; // For square album/track covers
import Musicplayer from "../components/musicPlayer";
import useHandleTrackSelect from "../api/useHandleTrackSelect";

// New components needed for the UI structure
import SectionBar from "../components/sectionBar"; // Reused, but now mainly for section titles
import SquareTrackCard from "../components/squareTrackCard"; // Assuming a component for the 'From your library' style
import CircularArtistCard from "../components/circularArtistCard"; // Assuming a component for 'Listen again' circular items

const HomePage = () => {
  // State for the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open on desktop
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const { user, isAuthReady } = useAuth();
  const router = useRouter();
  const { tracks, loading, error } = useFetchTracks();

  const [selectedTrack, setSelectedTrack] = useState(null);
  const handleTrackSelect = useHandleTrackSelect(setSelectedTrack);

  // --- Authentication Check Effect ---
  useEffect(() => {
    if (isAuthReady && user === null) {
      router.push("/login");
    } else if (isAuthReady && user) {
      console.log("User is logged in:", user);
    }
  }, [user, router, isAuthReady]);

 
  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white w-full">
        <p className="text-xl">Loading session...</p>
      </div>
    );
  }

  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white w-full">
        <p className="text-xl">Authentication required. Redirecting...</p>
      </div>
    );
  }

  // Determine user's name for a personalized touch (like 'EMMANUEL OGUNNEYE' in the image)
  const userName = user?.email?.split("@")[0] || "User" || user?.email?.split("@")[0] || "User";

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white ">
      
      
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

     
      <main 
        className={`
          min-h-screen w-full transition-all duration-300 ease-in-out 
          ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-20'}
        `}
      >
        {/* Top Header/Search Bar */}
        <TopSearchHeader
          userName={userName}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          className="sticky top-0 z-20 bg-black/50 backdrop-blur-md"
        />

        {/* Content Area */}
        <div className="w-full px-4 md:px-6 lg:px-8 py-6">
          {/* Quick Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
            {[
              "Podcasts",
              "Relax",
              "Feel good",
              "Workout",
              "Energize",
              "Party",
              "Romance",
              "Commute",
              "Sad",
              "Focus",
              "Sleep",
            ].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full
                text-sm font-medium transition-all whitespace-nowrap
                focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Listen Again Section */}
          <section className="mb-12">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <h2 className="text-gray-400 font-medium mb-1">{userName}</h2>
                <h3 className="text-2xl font-bold">Listen again</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {tracks.slice(0, 6).map((track, index) => (
                <div
                  key={track.id}
                  className="aspect-square relative group cursor-pointer"
                  onClick={() => handleTrackSelect(track)}
                >
                  {index % 2 === 0 ? (
                    <CircularArtistCard
                      artistName={track.artist}
                      subscriberCount={"TBD"}
                      className="transform transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <NewArrival
                      track={track}
                      isSmaller={true}
                      className="transform transition-transform group-hover:scale-105"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* From Your Library Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold mb-6">From your library</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {tracks.slice(6, 12).map((track) => (
                <div
                  key={track.id}
                  className="aspect-square relative group cursor-pointer"
                  onClick={() => handleTrackSelect(track)}
                >
                  <SquareTrackCard
                    track={track}
                    className="transform transition-transform group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* New Releases Section */}
          <section className="mb-12">
            <SectionBar sectionName="New Releases" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
              {tracks.slice(12, 18).map((track) => (
                <div
                  key={track.id}
                  className="aspect-square relative group cursor-pointer"
                  onClick={() => handleTrackSelect(track)}
                >
                  <SquareTrackCard
                    track={track}
                    className="transform transition-transform group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* States */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white" />
            </div>
          )}
          {error && (
            <div className="text-red-500 bg-red-500/10 p-4 rounded-lg">
              Error fetching tracks: {error}
            </div>
          )}
        </div>
      </main>

      {selectedTrack && <Musicplayer track={selectedTrack} />}
    </div>
  );
};

export default HomePage;