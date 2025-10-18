import { cacheData, getCachedData } from "./cacheFunction";
/*

Query Parameters:
q: This parameter specifies the search query.
remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis: This is the encoded search query. It includes:
remaster: Indicates that the search should include remastered tracks.
track:Doxy: Specifies that the search should include tracks named "Doxy".
artist:Miles Davis: Specifies that the search should include tracks by the artist "Miles Davis".
%2520: This is the URL-encoded representation of a space character (%20), but it appears to be double-encoded (%2520 is the encoding for %20).

*/

export  type SearchQueryType =
    | "track"
    | "album"
    | "playlist"
    | "show"
    | "artist"
    | "episode"
    | "audiobook";

export const search = async (accessToken: string, queryType:string, queryData:string) => {
    const cacheKey = 'search';
 
    //Check if access token is valid
    if (accessToken != "undefined" && accessToken) {
     try {
          const response = await fetch(`https://api.spotify.com/v1/search?q=remaster%2520${queryData}&type=${queryType}&limit=20&offset=2`, {
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
          cacheData(cacheKey, data); //cache data will be the default display value on the search page
          return data;
    } catch (error) {
          console.error('Error fetching search results:', error);
          throw error;
    }
    } else {
      alert("Access token is undefined");
    }
  };


  export const convertToQueryString = (track: string, artist: string, album: string, playlist: string, episode: string, audiobook: string, show: string): string =>{
  // Create an object to hold the parameters
  let params: { [key: string]: string } = {
    track,
    artist,
    album,
    playlist,
    episode,
    audiobook,
    show
  };

  // Filter out empty parameters
  params = Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== ""));

  // Encode the parameters
  let queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}:${encodeURIComponent(value)}`)
    .join("%2520");

  return queryString;
}

export type QueryFilterItem = {
  type: string;
  use: boolean;
};

export const getFilterTypes = (queries: QueryFilterItem[]): string => {
  // Filter out the items where `use` is true
  const usedTypes = queries.filter(query => query.use).map(query => query.type);

  // Join the types with a comma and URL-encode the result
  const queryString = encodeURIComponent(usedTypes.join(','));

  return queryString;
}