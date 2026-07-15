<script lang="ts">
  import { onMount } from "svelte";
  import TopArtists from "$lib/components/analytics/topData/TopArtists.svelte";
  import type { TopArtistsType } from "$lib/types/spotifyTypes1";
  import { getTopArtists } from "../../../api/artists";
  import { getTopTracks, getRecentTracks } from "../../../api/tracks";
  import TopTracks from "$lib/components/analytics/topData/TopTracks.svelte";
  import RecentTracks from "$lib/components/analytics/topData/RecentTracks.svelte";
  import LoaderM from "$lib/components/common/LoaderM.svelte";
  import { BarChart3 } from "@lucide/svelte";
  import { fade, fly } from "svelte/transition";

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
  let visible: boolean = $state(false);

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
      if (err.message) {
         try { err = JSON.parse(err.message); } catch(e){}
      }
      if (err.status == 401) {
        goto("/auth");
        return;
      }
      console.error("Error fetching top data:", err);
    } finally {
      loading = false;
      visible = true;
    }
  });

  const filters: string[] = ["Top Artists", "Top Tracks", "Listening History"];
  let category: string = $state(getFilterStringFromType(getCurrentTop()) || "Top Artists");
  
  const getCategoryCount = (cat: string) => {
    if (cat === "Top Artists") return topArtistsData.total;
    if (cat === "Top Tracks") return topTracksData.total;
    if (cat === "Listening History") return recentTracksData.items?.length || 0;
    return 0;
  };
</script>

<section class="min-h-screen bg-surface-50-950-token pb-20">
  <!-- Page Header -->
  <header class="w-full p-4 sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-20 relative bg-surface-100-800-token shadow-sm backdrop-blur-sm bg-opacity-80 sticky top-0 border-b border-surface-200-700-token">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-[var(--color-spotify-green)] rounded-full flex items-center justify-center shadow-lg shadow-[var(--color-spotify-green)]/30">
        <BarChart3 size={20} class="text-white" />
      </div>
      <div>
        <h1 class="h3 font-bold tracking-tight bg-gradient-to-br from-surface-900 to-surface-500 dark:from-surface-50 dark:to-surface-300 bg-clip-text text-transparent">
          Top Data & Trends
        </h1>
        <p class="text-xs text-surface-500-400-token mt-0.5">
          Your personalized Spotify insights
        </p>
      </div>
    </div>
  </header>

  {#if loading}
    <div class="min-h-[60vh] w-full flex flex-col justify-center items-center gap-4" in:fade>
      <LoaderM />
      <p class="text-surface-500-400-token animate-pulse font-medium">Analyzing your data...</p>
    </div>
  {:else if visible}
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-8">
      
      <!-- Tab Navigation -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8" in:fly={{ y: -20, duration: 600 }}>
        <div class="bg-surface-200-700-token/50 p-1 rounded-xl inline-flex w-full sm:w-auto overflow-x-auto no-scrollbar shadow-inner">
          {#each filters as filter}
            <button
              class="px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap {category === filter ? 'bg-surface-50-950-token text-[var(--color-spotify-green)] shadow-sm' : 'text-surface-600-300-token hover:text-surface-900-50-token'}"
              onclick={() => category = filter}
            >
              {filter}
            </button>
          {/each}
        </div>
        
        <!-- Category Stats -->
        <div class="bg-surface-100-800-token border border-surface-200-700-token px-4 py-2 rounded-xl shadow-sm text-sm font-medium flex items-center gap-2">
          <span class="text-surface-500-400-token">Total {category.includes('Artists') ? 'Artists' : category.includes('Tracks') ? 'Tracks' : 'History'}:</span>
          <span class="text-surface-900-50-token font-bold bg-surface-200-700-token px-2 py-0.5 rounded-md">{getCategoryCount(category)}</span>
        </div>
      </div>

      <!-- Content Area -->
      <div class="w-full relative min-h-[400px]">
        {#if category == "Top Artists"}
          <div in:fade={{ duration: 400 }}>
            <TopArtists topArtists_={topArtistsData} />
          </div>
        {:else if category == "Top Tracks"}
          <div in:fade={{ duration: 400 }}>
            <TopTracks topTracks_={topTracksData} />
          </div>
        {:else if category == "Listening History"}
          <div in:fade={{ duration: 400 }}>
            <RecentTracks recentTracks_={recentTracksData} />
          </div>
        {/if}
      </div>
    </div>
  {/if}
</section>
