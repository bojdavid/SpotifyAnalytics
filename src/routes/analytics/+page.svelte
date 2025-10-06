<script lang="ts">
  import { error } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import ProfileData from "$lib/components/analytics/ProfileData.svelte";
  import TopData from "$lib/components/analytics/topData/TopData.svelte";

  import type { Userdata } from "$lib/types/spotifyTypes1";
  import { getTopArtists } from "../../api/artists";
  import { getProfile } from "../../api/profile";
  import { updateNetworkStatus } from "../../api/shared";

  import "../../styles/app.css";
  import LightSwitch from "$lib/components/LightSwitch.svelte";

  let profileData: any = $state([]);

  let topArtistsData: any = $state([]);
  let loading: boolean = $state(false);

  onMount(async () => {
    try {
      loading = true;
      let accessToken: any = localStorage.getItem("access_token");

      [profileData, topArtistsData] = await Promise.all([
        getProfile(accessToken),
        getTopArtists(accessToken),
      ]);
    } catch (err) {
      loading = false;

      const errorMsg = err instanceof Error ? err.message : String(err);
      alert(`Error: ${errorMsg}`);
      console.error("The error message:", error);
      //Redirect back to the auth page if accessToken has expired.
    } finally {
      loading = false;
      //console.log("Profile data --------- ", profileData);
      //console.log("Top artists data --------", topArtistsData);
    }
  });

  const filters: string[] = [
    "Top Artists",
    "Following",
    "Playlists",
    "Random Song",
    "sdsd",
    "wewe",
    "wewe",
  ];

  //Sample range for table data
  const range = Array.from({ length: 5 }, (_, i) => i + 1);
</script>

<main class="mx-4 z-50">
  <div>
    {#if loading}
      <div>Loading</div>
    {:else}
      <div class="flex-col gap-4">
        <div
          class="flex justify-between flex-wrap max-w-[1700px] min-w-[200px] w-full pr-10 bg-surface-100 dark:bg-surface-900 mx-auto pl-5 mt-5"
        >
          <div class="max-w-[800px] w-full py-3 flex flex-wrap justify-between">
            <ProfileData user={profileData} />
          </div>
          <div class=" p-5">
            <LightSwitch />
          </div>
        </div>
      </div>
      <!-- CATEGORY OPTION -->
      <label class="label w-[250px]">
        <span class="label-text text-lg">Category To View</span>
        <select class="select">
          {#each filters as filter, i}
            <option value={i}> {filter}</option>
          {/each}
        </select>
      </label>
      <!-- TOP ARTISTS-->
      <div class="mt-10">
        <TopData topArtists_={topArtistsData} />
      </div>
    {/if}
  </div>
</main>
