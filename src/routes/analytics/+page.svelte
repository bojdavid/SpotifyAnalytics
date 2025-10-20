<script lang="ts">
  import TopCard from "$lib/components/analytics/home/TopCard.svelte";
  import { onMount, tick } from "svelte";
  import { getTopArtists } from "../../api/artists";
  import { getTopTracks, getRecentTracks } from "../../api/tracks";
  import { goto } from "$app/navigation";
  import LoaderM from "$lib/components/common/LoaderM.svelte";
  import { fade, fly } from "svelte/transition";

  import { setCurrentTop, type TopFilter } from "$lib/global/filter.svelte";

  let visible = $state(false);

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
      //console.log("Top artists data --------", topArtistsData);
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
    <div class="flex flex-col gap-5 justify-center items-center">
      <button class="text-2xl bg-spotify-green px-10 py-2 rounded-xl">
        Perform An Audio Analysis
      </button>
      <button class="text-2xl bg-spotify-green px-10 py-2 rounded-xl">
        View Playlists
      </button>
    </div>
  {/if}
</section>
