<script lang="ts">
  import TopCard from "$lib/components/analytics/home/TopCard.svelte";
  import { onMount, tick } from "svelte";
  import { getTopArtists } from "../../api/artists";
  import { getTopTracks, getRecentTracks } from "../../api/tracks";
  import { getAvailableDevices } from "../../api/player";
  import { getUsersPlaylists } from "../../api/playlist";
  import { goto } from "$app/navigation";
  import LoaderM from "$lib/components/common/LoaderM.svelte";
  import { fade, fly } from "svelte/transition";

  import { setCurrentTop, type TopFilter } from "$lib/global/filter.svelte";
  import PlaylistCard from "$lib/components/analytics/home/PlaylistCard.svelte";

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

      [topTracksData, topArtistsData, recentTracksData, playlists] =
        await Promise.all([
          getTopTracks(accessToken),
          getTopArtists(accessToken),
          getRecentTracks(accessToken),
          getUsersPlaylists(accessToken),
          //getAvailableDevices(accessToken),
        ]);
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
      await tick();
      loading = false;
      visible = true;
      //console.log("Available Devices --------", availableDevices);
      console.log(playlists);
    }
  });

  const viewMore = (data: TopFilter) => {
    setCurrentTop(data);
    goto("/analytics/top");
  };
</script>

<section class="py-10">
  {#if loading}
    <div class="h-screen w-full flex justify-center items-center">
      <LoaderM />
    </div>
  {:else if visible}
    <h1 class="mx-5">Inspect Available Devices</h1>
    <div
      class=" flex gap-5 justify-center flex-wrap my-10"
      transition:fly={{ y: 50, duration: 2000 }}
    >
      <TopCard
        title="Top 10 Tracks"
        data={topTracksData.items.slice(0, 5)}
        action={viewMore}
        type="top-tracks"
        background="bg-yellow-500"
      />
      <TopCard
        title="Top 10  Artists"
        data={topArtistsData.items.slice(0, 5)}
        action={viewMore}
        type="top-artists"
        background="bg-surface-500"
      />
      <TopCard
        title="Listening History"
        data={recentTracksData.items.slice(0, 5)}
        action={viewMore}
        type="top-recent"
        background="bg-red-500"
      />
    </div>
    <div
      class="text-center border-1 border-spotify-green w-fit mx-auto px-10 rounded-sm mb-5"
    >
      <h3 class="">Playlists</h3>
      <p class="text-sm font-semibold">
        <span class="font-medium text-gray-800 dark:text-gray-200"
          >Total Playlists :</span
        >
        {playlists.total}
      </p>
    </div>
    <div class="relative w-full overflow-x-scroll">
      <!-- Scrolling track -->
      <div class="inline-flex gap-4 animate-marquee">
        {#each playlists.items as playlist (playlist.id + "-dup")}
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
