<script lang="ts">
  import TopCard from "$lib/components/analytics/home/TopCard.svelte";
  import { onMount } from "svelte";
  import { getTopArtists } from "../../api/artists";
  import { getTopTracks, getRecentTracks } from "../../api/tracks";
  import type { SpotifyTrack, TopArtistsType } from "$lib/types/spotifyTypes1";
  import { goto } from "$app/navigation";

  let topTracksData: any = $state([]);
  let topArtistsData: any = $state([]);
  let recentTracksData: any = $state([]);
  let loading: boolean = $state(true);

  onMount(async () => {
    try {
      loading = true;
      let accessToken: any = localStorage.getItem("access_token");

      [topTracksData, topArtistsData, recentTracksData] = await Promise.all([
        getTopTracks(accessToken),
        getTopArtists(accessToken),
        getRecentTracks(accessToken),
      ]);
    } catch (err: any) {
      loading = false;
      err = JSON.parse(err.message);
      if (err.status == 401) {
        alert(`user is unAuthorized : , ${err.message}`);
        goto("/auth");
        return;
      }

      alert(`Error: ${JSON.stringify(err)}`);
      console.error("The error message:", err.message);
      //Redirect back to the auth page if accessToken has expired.
    } finally {
      loading = false;

      //console.log("Top artists data --------", topArtistsData);
    }
  });

  const action = () => {
    console.log("bleeeh");
  };
</script>

<section>
  {#if loading}
    loading....
  {:else}
    <div class=" flex gap-5 justify-center flex-wrap my-10">
      <TopCard
        title="Top 10 Tracks"
        data={topTracksData.items.slice(0, 10)}
        {action}
        type="track"
        background="spotify-green"
      />
      <TopCard
        title="Top 10  Artists"
        data={topArtistsData.items.slice(0, 10)}
        {action}
        type="artist"
        background="spotify-green"
      />
      <TopCard
        title="Recently Played Tracks"
        data={recentTracksData.items.slice(0, 10)}
        {action}
        type="recent"
        background="spotify-black/50"
      />
    </div>
  {/if}
  <div class="flex flex-col gap-5 justify-center items-center">
    <button class="text-2xl bg-spotify-green px-10 py-2 rounded-xl">
      Perform An Audio Analysis
    </button>
    <button class="text-2xl bg-spotify-green px-10 py-2 rounded-xl">
      View Playlists
    </button>
  </div>
</section>
