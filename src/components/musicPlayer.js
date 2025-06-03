"use client";

import {
  FaHeart,
  FaRandom,
  FaRedo,
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const Musicplayer = ({ track }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.66);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [track]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!track) return null; // Don't render anything if no track is selected

  const streamUrl = track.resolvedStreamUrl;
;

  const artworkUrl =
    track.artwork?.["150x150"] || "https://via.placeholder.com/150";

  return (
    <div className="flex fixed bottom-0 z-50 items-center justify-between bg-black text-white px-6 py-4 w-full shadow-md">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <img src={artworkUrl} alt={track.title} className="w-12 h-12 rounded" />
        <div>
          <p className="font-medium text-base tracking-tighter text-white truncate whitespace-nowrap overflow-hidden">
            {track.title}
          </p>
          <p className="text-sm text-gray-400">{track.user.name}</p>
        </div>
        <FaHeart className="ml-4 cursor-pointer text-gray-400 hover:text-red-500" />
      </div>

      {/* Center Controls */}
      <div className="flex items-center gap-6">
        <FaRedo className="cursor-pointer hover:text-purple-400" />
        <FaStepBackward className="cursor-pointer hover:text-purple-400" />
        <button
          onClick={togglePlay}
          className="bg-white text-black rounded-full p-3 hover:scale-105 transition"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <FaStepForward className="cursor-pointer hover:text-purple-400" />
        <FaRandom className="cursor-pointer hover:text-purple-400" />
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 w-48">
        <span className="text-purple-400 text-xs w-6">
          {Math.round(volume * 100)}
        </span>
        {isMuted ? (
          <FaVolumeMute className="cursor-pointer" onClick={toggleMute} />
        ) : (
          <FaVolumeUp className="cursor-pointer" onClick={toggleMute} />
        )}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full"
        />
      </div>

      <audio ref={audioRef} preload="auto">
        <source src={streamUrl} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default Musicplayer;
