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

  let searchValue: string = $state("");
  let timeoutId: number | null = null;

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
          JSON.parse(savedFilterTypes)
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
        queryParameters.audiobook
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

<section class=" mx-2 min-h-[400px] h-auto px-5">
  <div class="flex justify-center pt-5 relative">
    <div class="relative w-[700px]">
      <Search
        size={20}
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search for a song"
        class=" max-w-[700px] w-full border rounded-lg px-5 pl-10 py-2 text-lg focus:border-spotify-green focus:ring-spotify-green focus:outline-none"
        bind:value={queryParameters.track}
        oninput={handleInputChange}
      />
    </div>

    <button onclick={toggleShowFilterOptions} class="mx-3">
      <SlidersHorizontal size={20} />
    </button>
    {#if showFIlterOptions}
      <SearchFilter saveFilters={updateFilterType} {toggleShowFilterOptions} />
    {/if}
  </div>
  {#if isLoading}
    <div class="flex justify-center items-center">
      <Loader size={60} class="animate-spin mt-10" />
    </div>
  {:else}
    <div class="  h-full w-full mt-5">
      {#if searchData == undefined || searchData == null || searchData == ""}
        <div class="w-full h-full flex justify-center items-center flex-col">
          <img
            src={SL}
            alt="spotify-logo"
            class="w-50 h-auto cover opacity-50"
          />
          <p class="text-md">No recent Searches</p>
        </div>
      {:else}
        <div class="">
          <Tabs tabData={queryArray} {activetab} {setActiveTab} />
        </div>
        <div>
          <SearchResults {searchData} {activetab} />
        </div>
      {/if}
    </div>
  {/if}
</section>
