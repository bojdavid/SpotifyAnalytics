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

  export   interface TopArtistsType {
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

  export interface SpotifyApiError{
    status:number;
    message:string;
  }

  // TypeScript Interfaces
interface ExternalUrls {
  spotify: string;
}

interface ExternalIds {
  isrc: string;
}

interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: { url: string; height: number; width: number }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface SpotifyTrack {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
}