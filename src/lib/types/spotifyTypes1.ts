export   interface Userdata {
    country: string;
    display_name: string;
    email: string;
    explicit_content:any
    external_urls: any
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    images: userDataImageType[];
    product: string;
    type: string;
    uri: string;
  }

interface userDataImageType {
        url: string;
        height: number;
        width: number;
      }

  export   interface TopArtists {
    name: string;
    image: {
      url: string;
      height: number;
      width: number;
    };
    followers: {href:string, total:number};
    genres: string[];
    href: string; // A link to the Web API endpoint providing full details of the artist.
    uri: string; //The Spotify URI for the artist.
  }

  export interface TrackArtistsData {
    artistsName: string;
    id: string;
    href: string; // A link to the Web API endpoint providing full details of the artist.
    uri: string; // The Spotify URI for the artist.
  }

  export interface TopTracks {
    artists: TrackArtistsData[];
    availableMarkets: string[]; // a list of countries the song is playable in
    duration: number;
    explicit: boolean;
    link_to_track: string;
    popularity: number; // how much you have listened to the song i guess
    is_local: boolean; // whether the file is from a local stroge
  }