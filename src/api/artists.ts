import { cacheData, getCachedData } from "./cacheFunction";


export const getTopArtists = async (accessToken: any) => {
    const cacheKey = 'topArtistsData';
      // Try to get cached data
      const cachedData = getCachedData<any>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

       
    //Check if access token is valid
    if (accessToken != "undefined" && accessToken) {
     try {
          const response = await fetch("https://api.spotify.com/v1/me/top/artists?offset=1&limit=40", {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });

          if (!response.ok) {
             const errorData = await response.json(); // Parse the error response
              const errorText = errorData.error ? errorData.error.message : JSON.stringify(errorData);

            throw new Error(` Error getting top artists data [${response.status}]: ${errorText}`);
          }

          const data = await response.json();
          // Cache the data
          cacheData(cacheKey, data);
          return data;
    } catch (error) {
          console.error('Error fetching Top Artists data:', error);
          throw error;
    }
    } else {
      alert("Access token is undefined");
    }
  };