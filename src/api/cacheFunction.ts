const cacheDuration = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Stores data in sessionStorage with a timestamp to manage cache expiration.
 * @param key - The unique identifier for the cached item
 * @param data - The data payload to cache
 */
export const cacheData = (key: string, data: any) => {
  const now = Date.now();
  sessionStorage.setItem(key, JSON.stringify({ data, timestamp: now }));
}

/**
 * Retrieves cached data if it exists and has not expired (within 5 minutes).
 * @param key - The unique identifier for the cached item
 * @returns The cached data if valid, otherwise null
 */
export const getCachedData = <T>(key: string): T | null  => {
  const cachedData = sessionStorage.getItem(key);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    const now = Date.now();
    if (now - timestamp < cacheDuration) {
      console.log('Using cached data');
      return data;
    } else {
      console.log('Cached data expired');
    }
  }
  return null;
}