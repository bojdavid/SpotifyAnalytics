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


export const getTrackFeatures = async (accessToken:string, trackId:string) =>{
  const cacheKey = `trackFeatures-${trackId}`;
      // Try to get cached data
      const cachedData = getCachedData<any>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

       
    //Check if access token is valid
    if (accessToken != "undefined" && accessToken) {
     try {
          const response = await fetch(`https://api.spotify.com/v1/audio-features/11dFghVXANMlKmJXsNCbNl`, {
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
          console.error('Error fetching track features:', error);
          throw error;
    }
    } else {
      alert("Access token is undefined");
    }
}

export const checkIfUserSavedTrack = async (accessToken:string, trackId:string) =>{
  const cacheKey = `savedTrack-${trackId}`;
      // Try to get cached data
      const cachedData = getCachedData<any>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

       
    //Check if access token is valid
    if (accessToken != "undefined" && accessToken) {
     try {
          const response = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`, {
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
          console.error('Error checking if track is saved:', error);
          throw error;
    }
    } else {
      alert("Access token is undefined");
    }
}

export const saveTrack = async (accessToken:string, trackId:string) =>{  
  let payload = JSON.stringify(
                          {ids: [trackId],
                          timestamped_ids: [
                            {
                              id: "string",
                              added_at: "string"
                       }]
                       })

    //Check if access token is valid
    if (accessToken != "undefined" && accessToken) {
     try {
          const response = await fetch("https://api.spotify.com/v1/me/tracks", {
            method: "PUT",
            headers: {
              Authorization: "Bearer " + accessToken,
            },
            body: payload
          });

          if (!response.ok) {
             const errorData = await response.json(); // Parse the error response
               
            throw new Error(JSON.stringify(errorData.error))
          }

          const data = await response.json();
          return data;
    } catch (error) {
          console.error('Error saving track:', error);
          throw error;
    }
    } else {
      alert("Access token is undefined");
    }
}


/*
export const unSaveTrack = async (accessToken:string, trackId:string) =>{
  //Check if access token is valid
    if (accessToken != "undefined" && accessToken) {
     try {
          const response = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });

          if (!response.ok) {
             const errorData = await response.json(); // Parse the error response
               
            throw new Error(JSON.stringify(errorData.error))
          }

          const data = await response.json();
          return data;
    } catch (error) {
          console.error('Error checking if track is saved:', error);
          throw error;
    }
    } else {
      alert("Access token is undefined");
    }
}
    */