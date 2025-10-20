import { getCachedData, cacheData } from "./cacheFunction";


export const getAvailableDevices = async (accessToken: any) => {
    const cacheKey = 'availableDevices';
      // Try to get cached data
      const cachedData = getCachedData<any>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

       
    //Check if access token is valid
    if (accessToken != "undefined" && accessToken) {
     try {
          const response = await fetch("https://api.spotify.com/v1/me/player/devices", {
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
          console.error('Error fetching Available Devices', error);
          throw error;
    }
    } else {
      alert("Access token is undefined");
    }
  };