import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import useFetchTracks from "../hooks/useFetchTracks";
import SectionBar from "../components/sectionBar";
import NewArrival from "../components/newArrival";
import TrackCard from "../components/trackCard";
import Heading from "../components/heading";
import Musicplayer from "../components/musicPlayer";
import useHandleTrackSelect from "../api/useHandleTrackSelect";

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const { tracks, loading, error } = useFetchTracks();

  const [selectedTrack, setSelectedTrack] = useState(null);
  const handleTrackSelect = useHandleTrackSelect(setSelectedTrack);

  useEffect(() => {
    if (user) {
      console.log("User is logged in:", user);
    } else {
      console.log("No user is logged in.");
    }
  }, [user]);
  return (
    <div className="w-[80vw]">
      {/* Top Header */}
      <Heading />

      {/* New Arrival Banner */}
      <section className="my-10">
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
                onClick={() => handleTrackSelect(track)}
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
                onClick={() => handleTrackSelect(track)}
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
                onClick={() => handleTrackSelect(track)}
              >
                <TrackCard track={track} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loading and Error States */}
      {loading && <p className="text-gray-400">Loading tracks...</p>}
      {error && <p className="text-red-500">Error fetching tracks: {error}</p>}
      {/* Show music player only when a track is selected */}
      {selectedTrack && <Musicplayer track={selectedTrack} />}
    </div>
  );
};

export default HomePage;
