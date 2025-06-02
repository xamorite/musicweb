// source/pages/index.js
import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import useFetchTracks from "../hooks/useFetchTracks";
import TrackCard from "../components/TrackCard";
import Sidebar from "../components/sidebar";
import { Search } from "lucide-react";
import NewArrival from "../components/newArrival";

const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth(); // Get the current user from Auth context
  const { tracks, loading, error } = useFetchTracks(); // Fetch music tracks

  useEffect(() => {
    if (user) {
      console.log("User is logged in:", user);
    } else {
      console.log("No user is logged in.");
    }
  }, [user]);

  return (
    <div className="flex flex-row  bg-gray-800 text-white">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
      <div  className={`transition-all duration-300 ${
          collapsed ? 'ml-20' : 'ml-[15vw]'
        } p-6`}>
        <div className="text-white py-8 ">
          {" "}
          
          <div className="flex items-center justify-between">
            <div>
              <span>&lt;</span>
              <span>&gt;</span>
            </div>
            <div className="flex items-center bg-gray-900 rounded-md p-2 me-8">
              {" "}
              
              <Search size={16} className="mr-2.5" />{" "}
              
              <input
                type="text"
                placeholder="What do you want to listen to?"
                className="bg-transparent border-none text-white outline-none text-sm"
              />
            </div>
          </div>
        </div>
        {loading && <p>Loading tracks...</p>}
        {error && <p>Error fetching tracks: {error}</p>}

        <div className="p-4 rounded-lg">
          <h2 className="my-8 text-lg lg:text-3xl font-bold text-gray-100">
            <div className="flex flex-wrap gap-4">
              {tracks.slice(0, 1).map((track) => (
                <NewArrival key={track.id} track={track} />
              ))}
            </div>
            Featured Tracks
          </h2>
          <div className="flex flex-row gap-4 mb-8">
            {tracks.length === 0 && !loading && <p>No tracks available.</p>}
            <div className="flex flex-wrap gap-4">
              {tracks.slice(0, 10).map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          </div>
        </div>

        <h2>All Tracks</h2>
      </div>
    </div>
  );
};

export default Home;
