<script lang="ts">
  import { getUsersPlaylists, getPlaylistTracks } from "../../../api/playlist";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { tick } from "svelte";
  import LoaderM from "$lib/components/common/LoaderM.svelte";
  import { ChevronDown } from "@lucide/svelte";
  import PlaylistsDropDown from "$lib/components/analytics/playlists/PlaylistsDropDown.svelte";
  import ActivePlayListTrackTable from "$lib/components/analytics/playlists/ActivePlayListTrackTable.svelte";
  import {
    setCurrentPlaylist,
    getCurrentPlaylist,
  } from "$lib/global/playlist.svelte";

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

      [playlists] = await Promise.all([getUsersPlaylists(accessToken)]);
      activePlaylistTracks = await getPlaylistTracks(
        accessToken,
        playlists.items[0].id
      );
    } catch (err: any) {
      loading = false;
      err = JSON.parse(err.message);
      if (err.status == 401) {
        //alert(`user is unAuthorized : , ${err.message}`);
        goto("/auth");
        return;
      }

      alert(`Error: ${err.message}`);
      console.error("The error message:", err.message);
      //Redirect back to the auth page if accessToken has expired.
    } finally {
      let currentP = getCurrentPlaylist();
      if (currentP == null) {
        setCurrentPlaylist(playlists.items[0]);
      }
      activePlaylist = getCurrentPlaylist();
      await tick();
      loading = false;
      visible = true;
      //console.log(playlists);
    }
  });

  const updateActivePlaylist = async (playlist: any) => {
    playlistTrackLoading = true;
    activePlaylist = playlist;
    try {
      activePlaylistTracks = await getPlaylistTracks(accessToken, playlist.id);
    } catch (error) {
      console.error("AN error occured", error);
    } finally {
      console.log("Dunno what happened");
      playlistTrackLoading = false;
    }
  };
</script>

<section class="min-h-screen">
  <header
    class="text-center border-1 border-spotify-green w-fit mx-auto px-10 rounded-sm"
  >
    <h3 class="">Playlists</h3>
    <p>
      Total Playlists: {playlists.total}
    </p>
  </header>

  {#if loading}
    <div class="h-screen w-full flex justify-center items-center">
      <LoaderM />
    </div>
  {:else}
    <!-- Select Playlist -->
    <div class="relative px-10 mb-5 h-30 mt-5 mx-auto">
      <PlaylistsDropDown {activePlaylist} {playlists} {updateActivePlaylist} />
    </div>

    {#if playlistTrackLoading}
      <div class="w-full mb-5">
        <div class="space-y-4">
          <div class="placeholder animate-pulse h-10"></div>
          <div class="placeholder animate-pulse h-10"></div>
          <div class="placeholder animate-pulse h-10"></div>
          <div class="placeholder animate-pulse h-10"></div>
          <div class="placeholder animate-pulse h-10"></div>
          <div class="placeholder animate-pulse h-10"></div>
          <div class="placeholder animate-pulse h-10"></div>
        </div>
      </div>
    {:else}
      <div class="w-full mb-5">
        <ActivePlayListTrackTable playlistTracks={activePlaylistTracks} />
      </div>
    {/if}
  {/if}
</section>

<style>
</style>
