<script lang="ts">
  import { onMount } from "svelte";
  import TopArtists from "$lib/components/analytics/topData/TopArtists.svelte";
  import type { SpotifyTrack, TopArtistsType } from "$lib/types/spotifyTypes1";
  import { getTopArtists } from "../../../api/artists";
  import { getTopTracks, getRecentTracks } from "../../../api/tracks";
  import TopTracks from "$lib/components/analytics/topData/TopTracks.svelte";
  import RecentTracks from "$lib/components/analytics/topData/RecentTracks.svelte";
  import LoaderM from "$lib/components/common/LoaderM.svelte";

  import {
    getCurrentTop,
    getFilterStringFromType,
  } from "$lib/global/filter.svelte";

  import { goto } from "$app/navigation";

  let topTracksData = $state<{ items: any[]; total: number }>({
    items: [],
    total: 0,
  });
  let topArtistsData = $state<{ items: TopArtistsType[]; total: number }>({
    items: [],
    total: 0,
  });
  let recentTracksData = $state<{ items: any[]; limit: number }>({
    items: [],
    limit: 0,
  });
  let loading: boolean = $state(false);

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
      //include ranking into the

      console.log("this is the tops tracks data", topTracksData);
      loading = false;
    }
  });

  const filters: string[] = ["Top Artists", "Top Tracks", "Listening History"];

  let category: string = $state(getFilterStringFromType(getCurrentTop()));
</script>

<main class="px-2">
  <div>
    {#if loading}
      <div class="h-screen w-full flex justify-center items-center">
        <LoaderM />
      </div>
    {:else}
      <div class="flex justify-evenly px-5 items-center mt-5">
        <!-- CATEGORY OPTION -->
        <label class="label flex gap-5 items-center">
          <span class="label-text text-md md:text-lg">Category: </span>
          <select
            class="outline-none focus:border-spotify-green/50 border-1 dark:border-gray-700 border-gray-400 rounded-sm text-center py-2 text-xs md:text-lg"
            bind:value={category}
          >
            {#each filters as filter}
              <option value={filter}> {filter}</option>
            {/each}
          </select>
        </label>
        {#if category != "Listening History"}
          <div
            class="whitespace-nowrap text-xs md:text-lg bg-spotify-green px-2 md:px-5 py-2 font-bold rounded-sm shadow-lg"
          >
            <span class="font-light">
              {category == "Top Tracks"
                ? "Tracks"
                : category == "Top Artists"
                  ? "Artists"
                  : ""} :
            </span>
            {category == "Top Artists"
              ? topArtistsData.total
              : category == "Top Tracks"
                ? topTracksData.total
                : ""}
          </div>
        {/if}
      </div>
      {#if category == "Top Artists"}
        <!-- TOP ARTISTS-->
        <div class="mt-10 w-full">
          <TopArtists topArtists_={topArtistsData} />
        </div>
      {:else if category == "Top Tracks"}
        <!-- Top Tracks -->
        <div class="mt-10">
          <TopTracks topTracks_={topTracksData} />
        </div>
      {:else if category == "Listening History"}
        <!-- Top Tracks -->
        <div class="mt-10">
          <RecentTracks recentTracks_={recentTracksData} />
        </div>
      {/if}
    {/if}
  </div>
</main>
