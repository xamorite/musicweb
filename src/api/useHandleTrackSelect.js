import { useCallback } from "react";

// Use the public environment variable
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const APP_NAME = 'xamorite_music';

const useHandleTrackSelect = (setSelectedTrack) => {
  const handleTrackSelect = useCallback(async (track) => {
    // Safety check for the ENV variable
    if (!API_HOST) {
      console.error('API_HOST environment variable (NEXT_PUBLIC_API_HOST) is not set.');
      return; 
    }
    
    try {
      // Use the ENV variable in the fetch call
      const res = await fetch(
        `${API_HOST}/v1/tracks/${track.id}/stream?app_name=${APP_NAME}`,
        { redirect: "follow" }
      );

      // If the response is a redirect, the final URL will be in res.url
      const finalStreamUrl = res.url;

      // Add resolved URL to the track object
      setSelectedTrack({
        ...track,
        resolvedStreamUrl: finalStreamUrl,
      });
    } catch (error) {
      console.error("Error resolving track stream URL:", error);
    }
  }, [setSelectedTrack]);

  return handleTrackSelect;
};

export default useHandleTrackSelect;