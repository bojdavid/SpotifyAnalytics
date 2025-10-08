import { cacheData, getCachedData } from "./cacheFunction";

export   async function getProfile(accessToken: any) {
     const cacheKey = 'profileData';
      // Try to get cached data
      const cachedData = getCachedData<any>(cacheKey);
      if (cachedData) {
        return cachedData;
      }


    //Check if access token is valid
    if (accessToken != "undefined" && accessToken) {
      try {
          const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });

          if (!response.ok) {
             const errorData = await response.json(); // Parse the error response
              //const errorText = errorData.error ? errorData.error.message : JSON.stringify(errorData);
            
            console.log("This is the error message on profile -----------------", errorData.error.message)

            throw new Error(JSON.stringify(errorData.error))
          }

          const data = await response.json();
          // Cache the data
          cacheData(cacheKey, data);
          return data;
    } catch (error) {
          console.error('Error fetching profile data:', error);
          throw error;
    }
    } else {
      alert("Access token is undefined");
    }
  }