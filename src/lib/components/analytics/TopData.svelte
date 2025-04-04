<script lang="ts">
  interface TopArtists {
    name: string;
    image: {
      url: string;
      height: number;
      width: number;
    };
    followers: number;
    genres: string[];
    href: string; // A link to the Web API endpoint providing full details of the artist.
    uri: string; //The Spotify URI for the artist.
  }

  interface TrackArtistsData {
    artistsName: string;
    id: string;
    href: string; // A link to the Web API endpoint providing full details of the artist.
    uri: string; // The Spotify URI for the artist.
  }

  interface TopTracks {
    artists: TrackArtistsData[];
    availableMarkets: string[]; // a list of countries the song is playable in
    duration: number;
    explicit: boolean;
    link_to_track: string;
    popularity: number; // how much you have listened to the song i guess
    is_local: boolean; // whether the file is from a local stroge
  }

  const topArtists: TopArtists[] = [
    {
      name: "Taylor Swift",
      image: { url: "#", height: 640, width: 640 },
      followers: 95000000,
      genres: ["pop", "country"],
      href: "#",
      uri: "#",
    },
    {
      name: "Drake",
      image: { url: "#", height: 640, width: 640 },
      followers: 85000000,
      genres: ["hip hop", "rap"],
      href: "#",
      uri: "#",
    },
    {
      name: "The Weeknd",
      image: { url: "#", height: 640, width: 640 },
      followers: 70000000,
      genres: ["r&b", "pop"],
      href: "#",
      uri: "#",
    },
    {
      name: "Beyoncé",
      image: { url: "#", height: 640, width: 640 },
      followers: 63000000,
      genres: ["pop", "r&b"],
      href: "#",
      uri: "#",
    },
    {
      name: "Ed Sheeran",
      image: { url: "#", height: 640, width: 640 },
      followers: 78000000,
      genres: ["pop", "acoustic"],
      href: "#",
      uri: "#",
    },
    {
      name: "Ariana Grande",
      image: { url: "#", height: 640, width: 640 },
      followers: 71000000,
      genres: ["pop", "r&b"],
      href: "#",
      uri: "#",
    },
    {
      name: "Billie Eilish",
      image: { url: "#", height: 640, width: 640 },
      followers: 69000000,
      genres: ["alt pop", "indie pop"],
      href: "#",
      uri: "#",
    },
    {
      name: "Post Malone",
      image: { url: "#", height: 640, width: 640 },
      followers: 60000000,
      genres: ["hip hop", "rap rock"],
      href: "#",
      uri: "#",
    },
    {
      name: "Olivia Rodrigo",
      image: { url: "#", height: 640, width: 640 },
      followers: 55000000,
      genres: ["pop", "indie"],
      href: "#",
      uri: "#",
    },
    {
      name: "Dua Lipa",
      image: { url: "#", height: 640, width: 640 },
      followers: 62000000,
      genres: ["pop", "dance pop"],
      href: "#",
      uri: "#",
    },
    {
      name: "Kendrick Lamar",
      image: { url: "#", height: 640, width: 640 },
      followers: 58000000,
      genres: ["hip hop", "rap"],
      href: "#",
      uri: "#",
    },
    {
      name: "SZA",
      image: { url: "#", height: 640, width: 640 },
      followers: 50000000,
      genres: ["r&b", "neo soul"],
      href: "#",
      uri: "#",
    },
    {
      name: "Doja Cat",
      image: { url: "#", height: 640, width: 640 },
      followers: 48000000,
      genres: ["pop", "hip hop"],
      href: "#",
      uri: "#",
    },
    {
      name: "Bad Bunny",
      image: { url: "#", height: 640, width: 640 },
      followers: 74000000,
      genres: ["reggaeton", "latin trap"],
      href: "#",
      uri: "#",
    },
    {
      name: "Harry Styles",
      image: { url: "#", height: 640, width: 640 },
      followers: 67000000,
      genres: ["pop", "rock"],
      href: "#",
      uri: "#",
    },
    {
      name: "Rihanna",
      image: { url: "#", height: 640, width: 640 },
      followers: 61000000,
      genres: ["pop", "r&b"],
      href: "#",
      uri: "#",
    },
    {
      name: "Shawn Mendes",
      image: { url: "#", height: 640, width: 640 },
      followers: 47000000,
      genres: ["pop", "acoustic"],
      href: "#",
      uri: "#",
    },
    {
      name: "Lizzo",
      image: { url: "#", height: 640, width: 640 },
      followers: 45000000,
      genres: ["pop", "funk"],
      href: "#",
      uri: "#",
    },
    {
      name: "J. Cole",
      image: { url: "#", height: 640, width: 640 },
      followers: 43000000,
      genres: ["hip hop", "rap"],
      href: "#",
      uri: "#",
    },
    {
      name: "Imagine Dragons",
      image: { url: "#", height: 640, width: 640 },
      followers: 55000000,
      genres: ["rock", "pop rock"],
      href: "#",
      uri: "#",
    },
  ];

  const trackArtists: TrackArtistsData[] = [
    { artistsName: "Taylor Swift", id: "1", href: "#", uri: "#" },
    { artistsName: "Drake", id: "2", href: "#", uri: "#" },
    { artistsName: "The Weeknd", id: "3", href: "#", uri: "#" },
    { artistsName: "Ed Sheeran", id: "4", href: "#", uri: "#" },
    { artistsName: "Ariana Grande", id: "5", href: "#", uri: "#" },
    { artistsName: "Billie Eilish", id: "6", href: "#", uri: "#" },
    { artistsName: "Post Malone", id: "7", href: "#", uri: "#" },
    { artistsName: "Olivia Rodrigo", id: "8", href: "#", uri: "#" },
    { artistsName: "Dua Lipa", id: "9", href: "#", uri: "#" },
    { artistsName: "SZA", id: "10", href: "#", uri: "#" },
    { artistsName: "Bad Bunny", id: "11", href: "#", uri: "#" },
    { artistsName: "Harry Styles", id: "12", href: "#", uri: "#" },
    { artistsName: "Rihanna", id: "13", href: "#", uri: "#" },
    { artistsName: "Shawn Mendes", id: "14", href: "#", uri: "#" },
    { artistsName: "Lizzo", id: "15", href: "#", uri: "#" },
    { artistsName: "J. Cole", id: "16", href: "#", uri: "#" },
    { artistsName: "Doja Cat", id: "17", href: "#", uri: "#" },
    { artistsName: "Beyoncé", id: "18", href: "#", uri: "#" },
    { artistsName: "Kendrick Lamar", id: "19", href: "#", uri: "#" },
    { artistsName: "Imagine Dragons", id: "20", href: "#", uri: "#" },
  ];

  let activeTop: string = "topArtists";
</script>

<div>
  {#if activeTop == "topArtists"}
    <div class="table-wrap">
      <table class="table caption-bottom">
        <caption class="pt-4">Top Aritsts</caption>
        <thead>
          <tr>
            <th>Aritst</th>
            <th>Followers</th>
            <th>Genres</th>
            <th class="">Weight</th>
          </tr>
        </thead>
        <tbody class="[&>tr]:hover:preset-tonal-primary">
          {#each topArtists as artists}
            <tr>
              <td>{artists.name}</td>
              <td>{artists.followers}</td>
              <td>{artists.genres}</td>
              <td>
                <a
                  href={artists.uri}
                  class="btn btn-preset-filled-primary-500 !text-right"
                >
                  View Artists Data</a
                ></td
              >
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Total</td>
            <td class="text-right">{topArtists.length} Elements</td>
          </tr>
        </tfoot>
      </table>
    </div>
  {/if}
</div>
