const cacheDuration = 300 * 60 * 1000; // 10 minutes in milliseconds

// Function to cache data with a timestamp
export const  cacheData = (key: string, data: any) => {
  const now = Date.now();
  sessionStorage.setItem(key, JSON.stringify({ data, timestamp: now }));
}

// Function to get cached data with expiration check
export const  getCachedData = <T>(key: string): T | null  => {
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