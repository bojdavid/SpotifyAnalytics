import { cacheData, getCachedData } from "./cacheFunction";


export const getTopTracks = async (accessToken: any) => {
    const cacheKey = 'topTracksData';
      // Try to get cached data
      const cachedData = getCachedData<any>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

       
    //Check if access token is valid
    if (accessToken != "undefined" && accessToken) {
     try {
          const response = await fetch("https://api.spotify.com/v1/me/top/tracks?offset=1&limit=40", {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });

          if (!response.ok) {
             const errorData = await response.json(); // Parse the error response
              const errorText = errorData.error ? errorData.error.message : JSON.stringify(errorData);
               
            throw new Error(JSON.stringify(errorData.error))
          }

          const data = await response.json();
          // Cache the data
          cacheData(cacheKey, data);
          return data;
    } catch (error) {
          console.error('Error fetching Top tracks data:', error);
          throw error;
    }
    } else {
      alert("Access token is undefined");
    }
  };


export const getRecentTracks = async (accessToken: any) =>{
  const cacheKey = 'recentlyPlayedTracksData';
      // Try to get cached data
      const cachedData = getCachedData<any>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

       
    //Check if access token is valid
    if (accessToken != "undefined" && accessToken) {
     try {
          const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?offset=1&limit=40", {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });

          if (!response.ok) {
             const errorData = await response.json(); // Parse the error response
               
            throw new Error(JSON.stringify(errorData.error))
          }

          const data = await response.json();
          // Cache the data
          cacheData(cacheKey, data);
          return data;
    } catch (error) {
          console.error('Error fetching Top tracks data:', error);
          throw error;
    }
    } else {
      alert("Access token is undefined");
    }
 
}