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
              //const errorText = errorData.error ? errorData.error.message : JSON.stringify(errorData); 

            throw new Error(JSON.stringify(errorData.error));
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

  export const getArtistTopTracks = async (accessToken:string, artistId:string) =>{
   
    const cacheKey = `artistTopTrack-${artistId}`;
      // Try to get cached data
      const cachedData = getCachedData<any>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

       
    //Check if access token is valid
    if (accessToken != "undefined" && accessToken) {
     try {
          const response = await fetch( `https://api.spotify.com/v1/artists/${artistId}/top-tracks?offset=1&limit=10`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });

          if (!response.ok) {
             const errorData = await response.json(); // Parse the error response
              //const errorText = errorData.error ? errorData.error.message : JSON.stringify(errorData); 

            throw new Error(JSON.stringify(errorData.error));
          }

          const data = await response.json();
          // Cache the data
          cacheData(cacheKey, data);
          return data;
    } catch (error) {
          console.error('Error fetching Artist top track:', error);
          throw error;
    }
    } else {
      alert("Access token is undefined");
    }
  };
  

  export const checkIfUserFollowsArtistOrUser = async (accessToken:string, artistId:string) =>{
    const cacheKey = `followsArtist-${artistId}`;
      // Try to get cached data
      const cachedData = getCachedData<any>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

       
    //Check if access token is valid
    if (accessToken != "undefined" && accessToken) {
     try {
          const response = await fetch( `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });

          if (!response.ok) {
             const errorData = await response.json(); // Parse the error response
              //const errorText = errorData.error ? errorData.error.message : JSON.stringify(errorData); 

            throw new Error(JSON.stringify(errorData.error));
          }

          const data = await response.json();
          // Cache the data
          cacheData(cacheKey, data);
          return data;
    } catch (error) {
          console.error('Error checking if user follows artists:', error);
          throw error;
    }
    } else {
      alert("Access token is undefined");
    }
  }