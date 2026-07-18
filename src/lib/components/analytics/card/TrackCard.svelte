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

<article class="w-full max-w-[450px] mx-auto bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 rounded-3xl overflow-hidden shadow-2xl relative group">
  <!-- Top Banner Background Blur -->
  <div class="absolute inset-0 h-72 w-full z-0 pointer-events-none">
    <img src={trackData.album.images[0]?.url || trackData.album.images[1]?.url} alt="" class="w-full h-full object-cover blur-3xl opacity-30 group-hover:opacity-40 transition-opacity duration-700" />
    <div class="absolute inset-0 bg-gradient-to-b from-zinc-900/10 via-zinc-900/80 to-zinc-900/100"></div>
  </div>

  <div class="p-6 sm:p-8 relative z-10 flex flex-col items-center">
    <!-- Album Art -->
    <div class="w-48 h-48 sm:w-56 sm:h-56 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.6)] mb-6 mt-2 relative group-hover:-translate-y-2 transition-transform duration-500">
      <img
        src={trackData.album.images[0]?.url || trackData.album.images[1]?.url}
        alt="{trackData.name} cover"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>

    <!-- Title & Artists -->
    <div class="text-center w-full mb-6">
      <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2 truncate px-2" title={trackData.name}>{trackData.name}</h2>
      <div class="text-zinc-400">
        <Artists artists={trackData.artists} />
      </div>
    </div>

    <!-- Metadata Grid -->
    <div class="w-full grid grid-cols-2 gap-4 mb-6 bg-zinc-800/40 p-4 rounded-2xl text-sm border border-zinc-700/30">
      <div class="flex flex-col">
        <span class="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1">Album</span>
        <a class="text-white hover:text-spotify-green hover:underline truncate" href={trackData.album.uri} title={trackData.album.name}>
          {trackData.album.name}
        </a>
      </div>
      <div class="flex flex-col">
        <span class="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1">Duration</span>
        <span class="text-white font-medium">{formatTime(trackData.duration_ms)}</span>
      </div>
      
      <div class="flex flex-col col-span-2">
        <div class="flex justify-between items-center mb-1">
          <span class="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Popularity</span>
          <span class="text-zinc-300 text-xs font-medium">{trackData.popularity}%</span>
        </div>
        <div class="w-full bg-zinc-700 h-1.5 rounded-full overflow-hidden">
          <div class="bg-spotify-green h-full rounded-full relative" style="width: {trackData.popularity}%">
             <div class="absolute inset-0 bg-white/20"></div>
          </div>
        </div>
      </div>
      
      {#if trackData.explicit}
        <div class="col-span-2 flex justify-center mt-1">
          <span class="inline-flex items-center justify-center gap-1 text-[10px] font-bold tracking-widest px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md w-max">
            EXPLICIT
          </span>
        </div>
      {/if}
    </div>

    <!-- Playback -->
    {#if trackData.is_playable && trackData.preview_url}
      <div class="w-full mb-6 relative z-20">
        <p class="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-3 pl-1">Preview Song</p>
        <div class="bg-zinc-800/60 p-1 rounded-full border border-zinc-700/50">
          <Playback preview_url={trackData.preview_url} />
        </div>
      </div>
    {/if}

    <!-- Actions -->
    <div class="w-full flex flex-col sm:flex-row gap-3 mt-2">
      <button class="flex-1 bg-zinc-800/80 hover:bg-zinc-700 text-white font-semibold py-3.5 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 shadow-lg">
        <PlusCircle size={18} class="text-spotify-green" />
        <span class="text-sm">Save</span>
      </button>
      <a
        href={trackData.uri}
        class="flex-1 bg-spotify-green hover:bg-[#3be477] hover:scale-[1.02] active:scale-95 text-black font-bold py-3.5 px-4 rounded-full transition-all duration-300 flex items-center justify-center shadow-[0_0_20px_rgba(29,185,84,0.3)] hover:shadow-[0_0_25px_rgba(29,185,84,0.5)]"
      >
        <span class="text-sm">Open in Spotify</span>
      </a>
    </div>
  </div>
</article>
