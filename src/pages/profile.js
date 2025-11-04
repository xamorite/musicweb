import React, { useState, useEffect } from 'react';
// Note: You would typically fetch this data from Firebase
// For this example, we'll use placeholder data.

// --- Placeholder Data ---
const userData = {
  username: "Xamorite",
  playlists: 9,
  followers: 1,
  following: 36,
  profileImage: "/images/profile-img.jpg", // Replace with actual path or Firebase URL
  topArtists: [
    { name: "Tye Tribbett", image: "/images/tye.jpg" },
    { name: "Prinx Emmanuel", image: "/images/prinx.jpg" },
    { name: "Victoria Orenze", image: "/images/victoria.jpg" },
    { name: "Jamie Grace", image: "/images/jamie.jpg" },
    { name: "Quvenzhané Wallis", image: "/images/placeholder.jpg" },
  ],
  topTracks: [
    { title: "All I Want (feat. Minon Sarten)", artist: "James Fortune", duration: "4:34" },
    { title: "Make Room", artist: "Jonathan McReynolds", duration: "5:40" },
    { title: "Breathe (feat. Jonathan McReynolds & MaV City Gospel Ch...", artist: "Maverick City Music", duration: "5:26" },
    { title: "Same God - Live", artist: "Tye Tribbett", duration: "3:19" },
  ],
};

// Array of possible gradient colors (blue, green, purple, red, yellow, brown, pink)
const gradientColors = [
    'from-blue-600 to-blue-900',
    'from-green-600 to-green-900',
    'from-purple-600 to-purple-900',
    'from-red-600 to-red-900',
    'from-yellow-600 to-yellow-900',
    'from-amber-800 to-amber-950', // Brown approximation
    'from-pink-600 to-pink-900',
];

const Profile = () => {
 const [headerGradient, setHeaderGradient] = useState('');

    useEffect(() => {
        // Randomly select a gradient on component mount
        const randomIndex = Math.floor(Math.random() * gradientColors.length);
        setHeaderGradient(gradientColors[randomIndex]);
    }, []);

    // Helper component for Artist Circles
    const ArtistCircle = ({ artist }) => (
        <div className="w-36 flex flex-col items-center p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors">
            {/* Using a placeholder for the actual image implementation */}
            <div 
                className="w-32 h-32 rounded-full bg-gray-700 mb-2 overflow-hidden" 
                style={{ backgroundImage: `url(${artist.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {/*  */}
            </div>
            <p className="text-white text-sm font-semibold truncate w-full text-center">{artist.name}</p>
            <p className="text-gray-400 text-xs truncate w-full text-center">Artist</p>
        </div>
    );

    // Helper component for Track Rows
    const TrackRow = ({ track, index }) => (
        <div className="flex items-center p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer">
            <span className="text-gray-400 w-8 text-center">{index + 1}</span>
            <div className="flex items-center flex-grow">
                {/*  */}
                <div className="w-12 h-12 bg-gray-700 rounded mr-4"></div> 
                <div className="flex-grow">
                    <p className="text-white text-sm font-semibold truncate">{track.title}</p>
                    <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                </div>
            </div>
            <span className="text-gray-400 text-sm ml-4">{track.duration}</span>
        </div>
    );

    return (
        <div className=" min-h-screen">
            <div className={`pt-20 pb-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b ${headerGradient}`}>
                
                {/* Profile Header Section */}
                <div className="flex items-end">
                    {/* Profile Image (Example: using a profile-like image) */}
                    <div className="w-52 h-52 bg-gray-800 rounded-full shadow-2xl overflow-hidden mr-6">
                        {/*  */}
                        {/* In a real app, use an Image tag with the URL from userData.profileImage */}
                    </div>
                    
                    {/* User Info */}
                    <div>
                        <p className="text-sm font-bold text-white uppercase">Profile</p>
                        <h1 className="text-6xl md:text-8xl font-black text-white mt-2">
                            {userData.username}<span className="text-4xl">©🎶</span>
                        </h1>
                        <p className="text-md text-white mt-4">
                            <span className="font-bold">{userData.playlists} Public Playlists</span> • 
                            <span className="font-bold"> {userData.followers} Follower</span> • 
                            <span className="font-bold"> {userData.following} Following</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="mt-5 px-6 md:px-8 lg:px-12 py-8  rounded-t-lg">
                
                {/* --- Top Artists Section --- */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Top artists this month</h2>
                    <p className="text-sm text-gray-400 mb-4">Only visible to you</p>
                    
                    <div className="flex space-x-4 overflow-x-auto pb-4">
                        {userData.topArtists.map((artist, index) => (
                            <ArtistCircle key={index} artist={artist} />
                        ))}
                    </div>
                </div>

                {/* --- Top Tracks Section --- */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Top tracks this month</h2>
                    <p className="text-sm text-gray-400 mb-4">Only visible to you</p>
                    
                    <div className="space-y-2">
                        {userData.topTracks.map((track, index) => (
                            <TrackRow key={index} track={track} index={index} />
                        ))}
                    </div>
                    <button className="mt-6 text-gray-400 text-sm hover:text-white transition-colors">Show all</button>
                </div>
            </div>
        </div>
    );
};
export default Profile;
