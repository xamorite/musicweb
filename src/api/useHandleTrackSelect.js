import { useCallback } from "react";

const useHandleTrackSelect = (setSelectedTrack) => {
  const handleTrackSelect = useCallback(async (track) => {
    try {
      const res = await fetch(
        `https://discoveryprovider.audius.co/v1/tracks/${track.id}/stream?app_name=xamorite_music`,
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
