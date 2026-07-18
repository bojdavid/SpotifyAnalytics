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

<section class="min-h-screen bg-zinc-950 pb-20 text-white selection:bg-spotify-green/30">
  <!-- Page Header -->
  <header class="w-full px-4 sm:px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-20 relative bg-zinc-900/80 backdrop-blur-xl sticky top-0 border-b border-zinc-800 shadow-lg shadow-black/20">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 bg-spotify-green rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(29,185,84,0.4)]">
        <BarChart3 size={24} class="text-black" />
      </div>
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-white">
          Top Data & Trends
        </h1>
        <p class="text-xs text-zinc-400 mt-0.5 font-medium tracking-wide uppercase">
          Your personalized Spotify insights
        </p>
      </div>
    </div>
  </header>

  {#if loading}
    <div class="min-h-[60vh] w-full flex flex-col justify-center items-center gap-6" in:fade>
      <LoaderM />
      <p class="text-spotify-green animate-pulse font-medium tracking-wider uppercase text-sm">Analyzing your data...</p>
    </div>
  {:else if visible}
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-8">
      
      <!-- Tab Navigation & Stats -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-10" in:fly={{ y: -20, duration: 600 }}>
        
        <!-- Segmented Control -->
        <div class="bg-zinc-900/60 p-1.5 rounded-full inline-flex w-full md:w-auto overflow-x-auto no-scrollbar border border-zinc-800/80 shadow-inner backdrop-blur-sm">
          {#each filters as filter}
            <button
              class="px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 whitespace-nowrap {category === filter ? 'bg-zinc-800 text-spotify-green shadow-md shadow-black/40 scale-100' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50 scale-95 hover:scale-100'}"
              onclick={() => category = filter}
            >
              {filter}
            </button>
          {/each}
        </div>
        
        <!-- Category Stats -->
        <div class="bg-zinc-900/60 border border-zinc-800/80 px-5 py-2.5 rounded-full shadow-lg backdrop-blur-sm text-sm font-medium flex items-center gap-3">
          <span class="text-zinc-400 uppercase tracking-wider text-[10px] font-bold">Total {category.includes('Artists') ? 'Artists' : category.includes('Tracks') ? 'Tracks' : 'History'}</span>
          <div class="bg-spotify-green/10 text-spotify-green border border-spotify-green/20 px-3 py-1 rounded-full font-bold shadow-[0_0_10px_rgba(29,185,84,0.1)]">
            {getCategoryCount(category)}
          </div>
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
