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
  class="absolute right-0 top-20 max-w-[500px] w-full min-h-[400px] border-1 border-spotify-green bg-spotify-green/90 z-50"
>
  Filter by type:
  <div class="flex gap-3 flex-wrap border-1 mx-3 p-3">
    {#each filterTypeQueries as query}
      <div class=" border-1 rounded-lg px-3">
        <input
          type="checkbox"
          id={query.type}
          bind:checked={query.use}
          class="w-5 h-5 my-auto"
        />
        <label for={query.type}>{query.type}</label>
      </div>
    {/each}
  </div>

  <button
    onclick={() => saveFilters_(filterTypeQueries)}
    class="bg-spotify-black text-white px-3 py-2 rounded-lg active:scale-90 transition-transform z-50 float-right mt-5"
  >
    Save filters
  </button>
</section>
