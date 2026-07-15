<script lang="ts">
  import { getUsersPlaylists, getPlaylistTracks } from "../../../api/playlist";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { tick } from "svelte";
  import LoaderM from "$lib/components/common/LoaderM.svelte";
  import { Music } from "@lucide/svelte";
  import PlaylistsDropDown from "$lib/components/analytics/playlists/PlaylistsDropDown.svelte";
  import ActivePlayListTrackTable from "$lib/components/analytics/playlists/ActivePlayListTrackTable.svelte";
  import {
    setCurrentPlaylist,
    getCurrentPlaylist,
  } from "$lib/global/playlist.svelte";
  import { fly, fade } from "svelte/transition";

  let visible = $state(false);
  let playlists: any = $state([]);
  let loading: boolean = $state(true);
  let activePlaylist: any = $state();
  let activePlaylistTracks: any = $state();
  let accessToken: any = $state("");
  let playlistTrackLoading: boolean = $state(false);

  onMount(async () => {
    try {
      loading = true;
      accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        goto("/auth");
        return;
      }

      [playlists] = await Promise.all([getUsersPlaylists(accessToken)]);
      
      let currentP = getCurrentPlaylist();
      if (!currentP && playlists?.items?.length > 0) {
        setCurrentPlaylist(playlists.items[0]);
      }
      activePlaylist = getCurrentPlaylist();

      if (activePlaylist) {
        activePlaylistTracks = await getPlaylistTracks(
          accessToken,
          activePlaylist.id
        );
      }
    } catch (err: any) {
      if (err.message) {
         try {
           err = JSON.parse(err.message);
         } catch(e) {}
      }
      if (err.status == 401) {
        goto("/auth");
        return;
      }
      console.error("Error fetching playlist tracks:", err);
    } finally {
      await tick();
      loading = false;
      visible = true;
    }
  });

  const updateActivePlaylist = async (playlist: any) => {
    playlistTrackLoading = true;
    activePlaylist = playlist;
    try {
      activePlaylistTracks = await getPlaylistTracks(accessToken, playlist.id);
    } catch (error) {
      console.error("An error occurred fetching tracks:", error);
    } finally {
      playlistTrackLoading = false;
    }
  };
</script>

<section class="min-h-screen bg-surface-50-950-token pb-20">
  <!-- Page Header -->
  <header class="w-full p-4 sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-20 relative bg-surface-100-800-token shadow-sm backdrop-blur-sm bg-opacity-80 sticky top-0 border-b border-surface-200-700-token">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-[var(--color-spotify-green)] rounded-full flex items-center justify-center shadow-lg shadow-[var(--color-spotify-green)]/30">
        <Music size={20} class="text-white" />
      </div>
      <div>
        <h1 class="h3 font-bold tracking-tight bg-gradient-to-br from-surface-900 to-surface-500 dark:from-surface-50 dark:to-surface-300 bg-clip-text text-transparent">
          Playlist Explorer
        </h1>
        <p class="text-xs text-surface-500-400-token mt-0.5">
          {playlists?.total || 0} playlists available
        </p>
      </div>
    </div>
  </header>

  {#if loading}
    <div class="min-h-[60vh] w-full flex flex-col justify-center items-center gap-4" in:fade>
      <LoaderM />
      <p class="text-surface-500-400-token animate-pulse font-medium">Loading your playlists...</p>
    </div>
  {:else if visible}
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-8">
      <!-- Select Playlist -->
      <div class="mb-8" in:fly={{ y: -20, duration: 600 }}>
        <p class="text-sm font-semibold text-surface-400-500-token uppercase tracking-wider mb-3">Select Playlist</p>
        <PlaylistsDropDown {activePlaylist} {playlists} {updateActivePlaylist} />
      </div>

      <!-- Tracks Table -->
      <div class="w-full">
        {#if playlistTrackLoading}
          <div class="space-y-3 mt-8 bg-surface-100-800-token p-4 rounded-xl border border-surface-200-700-token">
            {#each Array(6) as _, i}
              <div class="flex gap-4 items-center" style="animation-delay: {i * 100}ms">
                <div class="w-12 h-12 rounded bg-surface-300-600-token animate-pulse"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-surface-300-600-token rounded w-3/4 animate-pulse"></div>
                  <div class="h-3 bg-surface-300-600-token rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            {/each}
          </div>
        {:else if activePlaylistTracks}
          <div in:fade={{ duration: 400 }}>
            <ActivePlayListTrackTable playlistTracks={activePlaylistTracks} />
          </div>
        {/if}
      </div>
    </div>
  {/if}
</section>
