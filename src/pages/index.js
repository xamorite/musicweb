// source/pages/index.js
import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import useFetchTracks from "../hooks/useFetchTracks";
import TrackCard from "../components/TrackCard";
import Sidebar from "../components/sidebar";
import { Search } from "lucide-react";
import NewArrival from "../components/newArrival";
import SectionBar from "../components/sectionBar";

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const { tracks, loading, error } = useFetchTracks();

  useEffect(() => {
    if (user) {
      console.log("User is logged in:", user);
    } else {
      console.log("No user is logged in.");
    }
  }, [user]);

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`transition-all duration-300 flex-1 overflow-x-hidden ${
          collapsed ? "ml-20" : "ml-[15vw]"
        } p-6`}
      >
        {/* Top Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <button className="text-xl">&#x276E;</button>
            <button className="text-xl">&#x276F;</button>
          </div>
          <div className="flex items-center bg-gray-800 rounded-full px-4 py-2">
            <Search size={18} className="mr-2" />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              className="bg-transparent border-none text-white outline-none text-sm w-64"
            />
          </div>
        </header>

        {/* New Arrival Banner */}
        <section className="mb-10">
          {tracks.length > 0 && <NewArrival track={tracks[0]} />}
        </section>

        {/* Featured Section */}
        <section className="mb-12">
          <SectionBar sectionName="Featured Tracks" />
          <div className="relative overflow-x-auto pb-2 no-scrollbar">
            <div className="flex gap-4 ">
              {tracks.slice(1, 11).map((track) => (
                <div
                  key={track.id}
                  className="flex-shrink-0 w-44 md:w-52 lg:w-56"
                >
                  <TrackCard track={track} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Tracks Section */}
        <section className="mb-12">
         <SectionBar sectionName="For You" />
          <div className="relative overflow-x-auto pb-2 no-scrollbar">
            <div className="flex gap-4 ">
              {tracks.slice(22, 33).map((track) => (
                <div
                  key={track.id}
                  className="flex-shrink-0 w-44 md:w-52 lg:w-56"
                >
                  <TrackCard track={track} />
                </div>
              ))}
            </div>
          </div>
        </section>

         <section className="mb-12">
         <SectionBar sectionName="New Releases" />
          <div className="relative overflow-x-auto pb-2 no-scrollbar">
            <div className="flex gap-4 ">
              {tracks.slice(27, 37).map((track) => (
                <div
                  key={track.id}
                  className="flex-shrink-0 w-44 md:w-52 lg:w-56"
                >
                  <TrackCard track={track} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Loading and Error States */}
        {loading && <p className="text-gray-400">Loading tracks...</p>}
        {error && (
          <p className="text-red-500">Error fetching tracks: {error}</p>
        )}
      </div>
    </div>
  );
};

export default Home;
