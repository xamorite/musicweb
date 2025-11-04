
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const APP_NAME = 'xamorite_music';

export async function getTracks() {
  if (!API_HOST) {
    console.error('API_HOST environment variable (NEXT_PUBLIC_API_HOST) is not set.');
    return []; 
  }

  // 2. Use the environment variable in the fetch call
  const res = await fetch(`${API_HOST}/v1/tracks/trending?app_name=${APP_NAME}`);
  const json = await res.json();

  if (res.ok && Array.isArray(json.data)) {
    return json.data;
  }

  console.warn('Invalid response structure:', json);
  return []; // fallback
}