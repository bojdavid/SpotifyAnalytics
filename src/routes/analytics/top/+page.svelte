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

  let topTracksData = $state<{ items: any[] }>({ items: [] });
  let topArtistsData = $state<{ items: TopArtistsType[] }>({ items: [] });
  let recentTracksData = $state<{ items: any[] }>({ items: [] });
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
      <!-- CATEGORY OPTION -->
      <label class="label w-[250px]">
        <span class="label-text text-lg">Category To View</span>
        <select class="select" bind:value={category}>
          {#each filters as filter}
            <option value={filter}> {filter}</option>
          {/each}
        </select>
      </label>
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
