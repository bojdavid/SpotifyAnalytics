<script lang="ts">
  import PlaylistCard from "$lib/components/analytics/home/PlaylistCard.svelte";
  import { getUsersPlaylists, getPlaylistTracks } from "../../../api/playlist";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { tick } from "svelte";
  import LoaderM from "$lib/components/common/LoaderM.svelte";
  import { ChevronDown } from "@lucide/svelte";
  import PlaylistsDropDown from "$lib/components/analytics/playlists/PlaylistsDropDown.svelte";
  import ActivePlayListTrackTable from "$lib/components/analytics/playlists/ActivePlayListTrackTable.svelte";

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
      activePlaylist = playlists.items[0];
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
    <div class="relative px-10 mb-5 h-30">
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

    <div class="relative w-full overflow-x-scroll">
      <!-- Scrolling track -->
      <div class="inline-flex gap-4 animate-marquee">
        {#each playlists.items as playlist}
          <div class="shrink-0">
            <!-- fixed width so items don’t collapse -->
            <PlaylistCard playlistData={playlist} />
          </div>
        {/each}
      </div>
    </div>
  {/if}
</section>

<style>
  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    } /* move by half because we duplicated the list */
  }
  .animate-marquee {
    animation: marquee 30s linear infinite;
    white-space: nowrap; /* no line wrap */
    will-change: transform;
  }
</style>
