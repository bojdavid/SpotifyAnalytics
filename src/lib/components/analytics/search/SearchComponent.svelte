<script lang="ts">
  import { Search, Loader, SlidersHorizontal } from "@lucide/svelte";
  import SL from "../../../assets/spotify_logo.png";
  import {
    type SearchQueryType,
    search,
    convertToQueryString,
  } from "../../../../api/search";
  import {
    convertQueriesToEncodedString,
    convertToQueryArray,
  } from "$lib/global/functions";

  import { goto } from "$app/navigation";
  import { getCachedData } from "../../../../api/cacheFunction";
  import { onMount } from "svelte";

  import SearchFilter from "./SearchFilter.svelte";
  import SearchResults from "./SearchResults.svelte";
  import Tabs from "$lib/components/common/Tabs.svelte";

  let { closeDialog } = $props();

  let searchValue: string = $state("");
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  let isLoading: boolean = $state(false);
  let searchData: any = $state(getCachedData("search"));
  let queryArray: string[] = $state([]);
  let activetab: string = $state("");
  const setActiveTab = (active: string) => {
    activetab = active;
  };

  let queryParameters = $state({
    track: "",
    artist: "",
    album: "",
    playlist: "",
    episode: "",
    audiobook: "",
    show: "",
  });

  const updateFilterType = (data: any) => {
    //passed to the filter component to update the data that is there
    queryTypeFilter = data;
  };

  //show filterOptions
  let showFIlterOptions: boolean = $state(false);
  const toggleShowFilterOptions = () => {
    showFIlterOptions = !showFIlterOptions;
  };

  let queryTypeFilter: string = $state("");

  const updateQueryArray = () => {
    queryArray = convertToQueryArray(queryTypeFilter);
    activetab = queryArray[0];
  };

  onMount(() => {
    const savedFilterTypes = localStorage.getItem("filterQueryTypes");
    if (savedFilterTypes) {
      try {
        // Parse the saved filter types from localStorage
        queryTypeFilter = convertQueriesToEncodedString(
          JSON.parse(savedFilterTypes),
        );
      } catch (error) {
        // Handle the case where the saved data is not valid JSON
        console.error("Error parsing saved filter types:", error);
      }
    } else {
      queryTypeFilter = "album%2Ctrack%2Cplaylist";
    }

    updateQueryArray();
  });

  const handleSearch = async (query: string) => {
    if (query.length < 3) {
      // Only start searching after 3 characters
      return;
    }
    isLoading = true;

    try {
      let accessToken: any = localStorage.getItem("access_token");
      let queryData = convertToQueryString(
        queryParameters.track,
        queryParameters.album,
        queryParameters.playlist,
        queryParameters.show,
        queryParameters.artist,
        queryParameters.episode,
        queryParameters.audiobook,
      );
      const response = await search(accessToken, queryTypeFilter, queryData);
      searchData = response;
    } catch (err: any) {
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
      updateQueryArray();
      isLoading = false;
      console.log("THis is the search response --", searchData);
    }
  };

  const handleInputChange = (event: Event) => {
    const query = (event.target as HTMLInputElement).value;
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      handleSearch(query);
    }, 1000); // 1 second delay
  };
</script>

<section class="flex flex-col h-full min-h-[60vh] p-6 pt-12 md:px-8">
  <!-- Search Input Header -->
  <div class="flex items-center w-full gap-3 relative z-40">
    <div class="relative flex-1 group">
      <Search
        size={22}
        class="absolute left-5 top-1/2 transform -translate-y-1/2 text-zinc-400 group-focus-within:text-white transition-colors"
      />
      <input
        type="text"
        placeholder="What do you want to listen to?"
        class="w-full bg-zinc-800/80 border border-zinc-700/50 rounded-full px-6 pl-14 py-3.5 text-lg text-white placeholder-zinc-400 focus:bg-zinc-800 focus:border-spotify-green focus:ring-1 focus:ring-spotify-green focus:outline-none transition-all duration-300 shadow-inner"
        bind:value={queryParameters.track}
        oninput={handleInputChange}
        //autofocus
      />
    </div>

    <div class="relative">
      <button
        onclick={toggleShowFilterOptions}
        class="p-3.5 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-500 rounded-full text-zinc-300 hover:text-white transition-all duration-200 shadow-md {showFIlterOptions
          ? 'bg-zinc-700 text-spotify-green border-spotify-green/50'
          : ''}"
        aria-label="Toggle Filters"
      >
        <SlidersHorizontal size={22} />
      </button>

      {#if showFIlterOptions}
        <SearchFilter
          saveFilters={updateFilterType}
          {toggleShowFilterOptions}
        />
      {/if}
    </div>
  </div>

  <!-- Search Results Area -->
  <div class="flex-1 overflow-y-auto mt-6 pb-6 relative z-10 custom-scrollbar">
    {#if isLoading}
      <div class="flex justify-center items-center h-64">
        <Loader size={48} class="animate-spin text-spotify-green" />
      </div>
    {:else if !searchData || searchData == ""}
      <div
        class="w-full h-64 flex justify-center items-center flex-col opacity-70 mt-10"
      >
        <img
          src={SL}
          alt="spotify-logo"
          class="w-20 h-20 object-contain mb-6 grayscale opacity-30"
        />
        <p class="text-zinc-300 text-xl font-bold tracking-tight mb-2">
          Play what you love
        </p>
        <p class="text-zinc-500 text-sm">
          Search for artists, songs, podcasts, and more.
        </p>
      </div>
    {:else}
      <div
        class="mb-6 sticky top-0 bg-zinc-900/90 backdrop-blur-md z-20 py-2 border-b border-zinc-800/50"
      >
        <Tabs tabData={queryArray} {activetab} {setActiveTab} />
      </div>
      <div class="animate-in fade-in duration-500">
        <SearchResults {searchData} {activetab} />
      </div>
    {/if}
  </div>
</section>

<style>
  /* Custom scrollbar for a sleeker look */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
