<script lang="ts">
  import { PlusCircle } from "@lucide/svelte";
  import { formatTime, countryNames } from "$lib/global/functions";
  import { onMount } from "svelte";
  import { getTrackFeatures } from "../../../../api/tracks";
  import { tick } from "svelte";
  import { goto } from "$app/navigation";

  import Artists from "./trackCard/Artists.svelte";
  import Playback from "./trackCard/Playback.svelte";

  let { trackData } = $props();

  let trackFeatures: any = $state([]);
  let trackIsSaved: boolean = $state(false);
  let loading: boolean = $state(true);
  let visible: boolean = $state(false);

  const placeholderFunction = async () => {
    console.log("working");
    return true;
  };

  /*
  onMount(async () => {
    try {
      loading = true;
      let accessToken: any = localStorage.getItem("access_token");

      [trackFeatures, trackIsSaved] = await Promise.all([
        getTrackFeatures(accessToken, trackData.id),
        placeholderFunction(),
      ]);
    } catch (err: any) {
      loading = false;
      err = JSON.parse(err.message);
      //Redirect back to the auth page if accessToken has expired.
      if (err.status == 401) {
        goto("/auth");
        return;
      }

      alert(`Error: ${err.message}`);
      console.error("The error message:", err.message);
    } finally {
      await tick();
      loading = false;
      visible = true;
      console.log(" track features data --------", trackFeatures);
    }
  });
  */

  const genres = ["genre1", "genre2", "genre3", "genre4", "genre5"];
</script>

<article class=" min-w-[250px] max-w-full w-[600px] px-5">
  <div class="flex justify-space-between flex-col">
    <div>
      <header class="flex gap-5 justify-between pt-5">
        <div>
          <h2>{trackData.name}</h2>
          <!-- Album Link and Name-->
          <a class="text-xs text-surface-200" href={trackData.album.uri}>
            <span class="text-surface-400">Album : </span>
            {trackData.album.name}
          </a>
          <br />
          <span class="text-surface-400">Album type: </span>
          {trackData.album.album_type}

          <button
            class="text-spotify-green rounded-lg text-sm font-bold flex gap-1"
          >
            <span>
              <PlusCircle size={20} />
            </span>
            Add Song to Playlist
          </button>
        </div>
      </header>
    </div>
    <!-- Image container -->
    <div
      class="mt-5 border-2 border-spotify-green rounded-full w-60 h-60 mx-auto shadow-lg shadow-spotify-green hover:shadow-xl transition duration-300 ease-in-out overflow-hidden"
    >
      <img
        src={trackData.album.images[1].url}
        alt=""
        class="w-full h-full cover flex justify-end"
      />
    </div>
    <!-- Artist Container -->
    <Artists artists={trackData.artists} />
  </div>

  <p class=" mt-2">popularity: {trackData.popularity}</p>
  <p class=" mt-2">Duration: {formatTime(trackData.duration_ms)}</p>
  <p class=" mt-2">
    {trackData.explicit
      ? "This track has explicit lyrics"
      : "Track Does Not Have Explicit Lyrics"}
  </p>
  <p class=" mt-2">Preview Song</p>
  <p class=" mt-2">Disc Number : {trackData.disc_number}</p>

  {#if trackData.is_playable}
    <Playback preview_url={trackData.preview_url} />
  {/if}

  <!-- Actions-->
  <div class="flex justify-end mt-5">
    <a
      href={trackData.uri}
      class="text-spotify-green font-bold px-5 py-2 rounded-lg flex text-sm"
    >
      Open In Spotify
    </a>
  </div>

  <!-- Available Markets Container -->
  <!--
   <div class="mt-5">
     <h4>Available In:</h4>
     <div class="flex gap-2 flex-wrap">
       {#each trackData.available_markets as market}
         <div
           class="border-1 border-spotify-green rounded-sm px-3 text-xs sm:text-sm md:text-md"
         >
           {countryNames[market]}
         </div>
       {/each}
     </div>
   </div>
   -->
</article>
