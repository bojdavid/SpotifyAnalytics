<script lang="ts">
  import TopCard from "$lib/components/analytics/home/TopCard.svelte";
  import { onMount } from "svelte";
  import {
    getTopArtists,
    getTopArtists_4weeks,
    getTopArtists_1year,
  } from "../../api/artists";
  import {
    getTopTracks,
    getTopTracks_1year,
    getTopTracks_4weeks,
    getRecentTracks,
  } from "../../api/tracks";
  import { getAvailableDevices } from "../../api/player";
  import { getUsersPlaylists } from "../../api/playlist";
  import { goto } from "$app/navigation";
  import LoaderM from "$lib/components/common/LoaderM.svelte";
  import { fly, fade } from "svelte/transition";
  import LightSwitch from "$lib/components/LightSwitch.svelte";

  import { setCurrentTop, type TopFilter } from "$lib/global/filter.svelte";
  import PlaylistsTable from "$lib/components/analytics/home/PlaylistsTable.svelte";

  let visible = $state(false);

  let topTracksData: any = $state([]);
  let topArtistsData: any = $state([]);
  let recentTracksData: any = $state([]);
  let availableDevices: any = $state([]);
  let playlists: any = $state([]);

  let loading: boolean = $state(true);

  onMount(async () => {
    try {
      loading = true;
      let accessToken: any = localStorage.getItem("access_token");

      if (!accessToken) {
        goto("/auth");
        return;
      }

      [topTracksData, topArtistsData, recentTracksData, playlists] =
        await Promise.all([
          getTopTracks_1year(accessToken),
          getTopArtists_4weeks(accessToken),
          getRecentTracks(accessToken),
          getUsersPlaylists(accessToken),
          //getAvailableDevices(accessToken),
        ]);
    } catch (err: any) {
      if (err.message) {
         try {
           err = JSON.parse(err.message);
         } catch(e) {}
      }
      
      if (err.status == 401) {
        // Token expired
        goto("/auth");
        return;
      }

      console.error("Error fetching analytics data:", err);
    } finally {
      loading = false;
      visible = true;
    }
  });

  const viewMore = (data: TopFilter) => {
    setCurrentTop(data);
    goto("/analytics/top");
  };
</script>

<section class="min-h-screen bg-surface-50-950-token relative overflow-x-hidden pb-20">
  <!-- Top Navigation / Header -->
  <header class="w-full p-4 sm:px-8 py-6 flex justify-between items-center z-20 relative bg-surface-100-800-token shadow-sm backdrop-blur-sm bg-opacity-80 sticky top-0">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-[var(--color-spotify-green)] rounded-full flex items-center justify-center shadow-lg shadow-[var(--color-spotify-green)]/30">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
      </div>
      <h1 class="h3 font-bold tracking-tight bg-gradient-to-br from-surface-900 to-surface-500 dark:from-surface-50 dark:to-surface-300 bg-clip-text text-transparent">
        Dashboard
      </h1>
    </div>
    <LightSwitch />
  </header>

  {#if loading}
    <div class="min-h-[80vh] w-full flex flex-col justify-center items-center gap-4" in:fade>
      <LoaderM />
      <p class="text-surface-500-400-token animate-pulse font-medium">Crunching your Spotify data...</p>
    </div>
  {:else if visible}
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-8">
      
      <!-- Welcome Section -->
      <div class="mb-10" transition:fly={{ y: 20, duration: 800 }}>
        <h2 class="h1 font-black mb-2">Your Listening Habits</h2>
        <p class="text-surface-600-300-token text-lg">A deep dive into what makes your ears happy.</p>
      </div>

      <!-- Top Cards Row -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
        transition:fly={{ y: 50, duration: 1200, delay: 200 }}
      >
        <TopCard
          title="Top Tracks (All Time)"
          data={topTracksData?.items?.slice(0, 10) || []}
          action={viewMore}
          type="top-tracks"
          background="bg-gradient-to-br from-yellow-500/20 to-yellow-600/5 border border-yellow-500/30"
        />
        <TopCard
          title="Top Artists (This Month)"
          data={topArtistsData?.items?.slice(0, 10) || []}
          action={viewMore}
          type="top-artists"
          background="bg-gradient-to-br from-[var(--color-spotify-green)]/20 to-surface-500/5 border border-[var(--color-spotify-green)]/30"
        />
        <TopCard
          title="Recently Played"
          data={recentTracksData?.items?.slice(0, 10) || []}
          action={viewMore}
          type="top-recent"
          background="bg-gradient-to-br from-tertiary-500/20 to-tertiary-600/5 border border-tertiary-500/30"
        />
      </div>

      <hr class="opacity-20 mb-16 border-surface-900-50-token"/>

      <!-- Playlist Table -->
      <div transition:fly={{ y: 50, duration: 1200, delay: 400 }}>
        <PlaylistsTable {playlists} />
      </div>
    </div>
  {/if}
</section>

<style>
</style>
