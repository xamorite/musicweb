const API_HOST = 'https://discoveryprovider.audius.co';
const APP_NAME = 'xamorite_music';

export async function getTracks() {
  const res = await fetch(`${API_HOST}/v1/tracks/trending?app_name=${APP_NAME}`);
  const json = await res.json();

  if (res.ok && Array.isArray(json.data)) {
    return json.data;
  }

  console.warn('Invalid response structure:', json);
  return []; // fallback
}
