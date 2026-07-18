<script lang="ts">
  import { type QueryFilterItem } from "../../../../api/search";
  import { onMount } from "svelte";
  import { convertQueriesToEncodedString } from "$lib/global/functions";

  let { saveFilters, toggleShowFilterOptions } = $props();

  let filterTypeQueries: QueryFilterItem[] = $state([]);

  onMount(() => {
    const savedFilterTypes = localStorage.getItem("filterQueryTypes");
    if (savedFilterTypes) {
      try {
        // Parse the saved filter types from localStorage
        filterTypeQueries = JSON.parse(savedFilterTypes);
      } catch (error) {
        // Handle the case where the saved data is not valid JSON
        console.error("Error parsing saved filter types:", error);
      }
    } else {
      filterTypeQueries = [
        { type: "track", use: true },
        { type: "album", use: true },
        { type: "playlist", use: true },
        { type: "show", use: false },
        { type: "artist", use: true },
        { type: "episode", use: false },
        { type: "audiobook", use: false },
      ];
    }
  });

  const saveFilters_ = (data: QueryFilterItem[]) => {
    localStorage.setItem("filterQueryTypes", JSON.stringify(data));
    saveFilters(convertQueriesToEncodedString(data));
    toggleShowFilterOptions();
  };
</script>

<section
  class="absolute right-0 top-[60px] w-[320px] bg-zinc-900 border border-zinc-700/50 rounded-xl shadow-2xl z-50 overflow-hidden transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200"
>
  <div class="px-5 py-4 border-b border-zinc-800">
    <h3 class="text-white font-semibold text-sm tracking-wide">Filter your search</h3>
    <p class="text-zinc-400 text-xs mt-1">Select the categories you want to see.</p>
  </div>

  <div class="p-5 flex flex-wrap gap-2.5">
    {#each filterTypeQueries as query}
      <label class="cursor-pointer">
        <input
          type="checkbox"
          bind:checked={query.use}
          class="hidden"
        />
        <div 
          class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border {query.use ? 'bg-spotify-green text-black border-spotify-green hover:bg-green-400' : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-white'}"
        >
          {query.type.charAt(0).toUpperCase() + query.type.slice(1)}
        </div>
      </label>
    {/each}
  </div>

  <div class="p-4 bg-zinc-950/50 border-t border-zinc-800 flex justify-end">
    <button
      onclick={() => saveFilters_(filterTypeQueries)}
      class="bg-white hover:bg-zinc-200 text-black font-semibold px-5 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 active:scale-95"
    >
      Apply Filters
    </button>
  </div>
</section>
