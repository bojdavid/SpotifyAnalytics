<script lang="ts">
  import { error } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import TopArtists from "$lib/components/analytics/topData/TopArtists.svelte";

  import type { Userdata } from "$lib/types/spotifyTypes1";
  import type { SpotifyTrack, TopArtistsType } from "$lib/types/spotifyTypes1";
  import { getTopArtists } from "../../../api/artists";
  import { getTopTracks } from "../../../api/tracks";
  import { updateNetworkStatus } from "../../../api/shared";

  import LightSwitch from "$lib/components/LightSwitch.svelte";
  import TopTracks from "$lib/components/analytics/topData/TopTracks.svelte";

  import { goto } from "$app/navigation";

  let topTracksData: SpotifyTrack[] = $state([]);

  let topArtistsData: TopArtistsType[] = $state([]);
  let loading: boolean = $state(false);

  onMount(async () => {
    try {
      loading = true;
      let accessToken: any = localStorage.getItem("access_token");

      [topTracksData, topArtistsData] = await Promise.all([
        getTopTracks(accessToken),
        getTopArtists(accessToken),
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
      console.log("Profile data --------- ", topTracksData);
      //console.log("Top artists data --------", topArtistsData);
    }
  });

  const filters: string[] = ["Top Artists", "Top Tracks", "Random Song"];
  let category: string = $state("Top Artists");
</script>

<main class="px-2">
  <div>
    {#if loading}
      <div>Loading</div>
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
      {/if}
    {/if}
  </div>
</main>
