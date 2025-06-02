// source/hooks/useFetchTracks.js
import { useEffect, useState } from 'react';
import { getTracks } from '../api/musicApi'; // Adjust the path if needed

const useFetchTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getTracks();

        if (Array.isArray(data)) {
          setTracks(data);
        } else {
          console.warn('Expected an array but got:', data);
          setTracks([]); // fallback to empty array
          setError('Unexpected data format from API.');
        }
      } catch (err) {
        console.error('Error fetching tracks:', err);
        setError(err.message || 'Failed to fetch tracks.');
        setTracks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return { tracks, loading, error };
};

export default useFetchTracks;
