<script lang="ts">
  import { X, User, Loader } from "@lucide/svelte";
  import { formatFollowerCount } from "$lib/global/functions";
  import { onMount } from "svelte";
  import {
    getArtistTopTracks,
    checkIfUserFollowsArtistOrUser,
  } from "../../../../api/artists";
  import { goto } from "$app/navigation";
  import { tick } from "svelte";

  let { artistData } = $props();

  let artistTopTracks: any = $state([]);
  let userFollowsArtist: boolean = $state(false);
  let loading: boolean = $state(true);
  let visible: boolean = $state(false);
  let follow_unFollow_Artist_Pending: boolean = $state(false);

  onMount(async () => {
    try {
      loading = true;
      let accessToken: any = localStorage.getItem("access_token");

      [artistTopTracks, userFollowsArtist] = await Promise.all([
        getArtistTopTracks(accessToken, artistData.id),
        checkIfUserFollowsArtistOrUser(accessToken, artistData.id),
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
      //console.log(" artist track data --------", artistTopTracks);
    }
  });

  const follow_artist = () => {
    follow_unFollow_Artist_Pending = true;
    setTimeout(() => {
      follow_unFollow_Artist_Pending = false;
    }, 2000);
  };
  const unfollow_artist = () => {
    follow_unFollow_Artist_Pending = true;
    setTimeout(() => {
      follow_unFollow_Artist_Pending = false;
    }, 2000);
  };
</script>

<article class="w-full max-w-[450px] mx-auto bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 rounded-3xl overflow-hidden shadow-2xl relative group">
  <!-- Top Banner Background Blur -->
  <div class="absolute inset-0 h-64 w-full z-0 pointer-events-none">
    <img src={artistData.images[0]?.url || artistData.images[1]?.url} alt="" class="w-full h-full object-cover blur-3xl opacity-30 group-hover:opacity-40 transition-opacity duration-700" />
    <div class="absolute inset-0 bg-gradient-to-b from-zinc-900/10 via-zinc-900/80 to-zinc-900/100"></div>
  </div>

  <div class="p-6 sm:p-8 relative z-10 flex flex-col items-center">
    
    <!-- Follow Status Overlay (Top Right) -->
    <div class="absolute top-6 right-6 flex items-center gap-2 bg-zinc-800/60 border border-zinc-700/50 px-3 py-1.5 rounded-full backdrop-blur-sm text-xs font-semibold">
      {#if loading}
        <div class="w-16 h-3 bg-zinc-600 animate-pulse rounded"></div>
      {:else if userFollowsArtist}
        <User size={14} class="text-spotify-green" />
        <span class="text-spotify-green">Following</span>
      {:else}
        <User size={14} class="text-zinc-400" />
        <span class="text-zinc-400">Not Following</span>
      {/if}
      {#if follow_unFollow_Artist_Pending}
        <Loader size={12} class="animate-spin text-spotify-green ml-1" />
      {/if}
    </div>

    <!-- Artist Image -->
    <div class="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.6)] mb-6 mt-4 relative group-hover:-translate-y-2 transition-transform duration-500 border-4 border-zinc-800/50">
      <img
        src={artistData.images[0]?.url || artistData.images[1]?.url}
        alt={artistData.name}
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>

    <!-- Title & Stats -->
    <div class="text-center w-full mb-6">
      <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-2 truncate px-2" title={artistData.name}>{artistData.name}</h2>
      <div class="flex items-center justify-center gap-4 text-sm text-zinc-400">
        <div class="flex flex-col items-center">
          <span class="font-bold text-white">{formatFollowerCount(artistData.followers.total)}</span>
          <span class="text-[10px] uppercase tracking-wider">Followers</span>
        </div>
        <div class="w-px h-8 bg-zinc-700"></div>
        <div class="flex flex-col items-center">
          <span class="font-bold text-white">{artistData.popularity}%</span>
          <span class="text-[10px] uppercase tracking-wider">Popularity</span>
        </div>
      </div>
    </div>

    <!-- Genres Grid -->
    {#if artistData.genres?.length > 0}
      <div class="w-full mb-8">
        <h4 class="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-3 text-center">Genres</h4>
        <div class="flex gap-2 flex-wrap justify-center">
          {#each artistData.genres as genre}
            <span class="text-[10px] font-bold tracking-widest px-3 py-1.5 bg-zinc-800/60 text-zinc-300 border border-zinc-700/50 rounded-full hover:bg-zinc-700 hover:text-white transition-colors">
              {genre}
            </span>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Top Tracks -->
    <div class="w-full mb-6">
      <div class="flex justify-between items-end mb-3 px-1">
        <h4 class="text-white text-sm font-bold">Top Tracks</h4>
        <span class="text-zinc-500 text-[10px] uppercase tracking-wider">Scroll to view</span>
      </div>

      <div class="flex flex-col gap-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
        {#if loading}
          {#each [...Array(5).keys()] as n}
            <div class="w-full flex items-center bg-zinc-800/30 border border-zinc-800 p-2 animate-pulse rounded-xl gap-3">
              <div class="rounded-md bg-zinc-700/50 animate-pulse h-10 w-10 flex-shrink-0"></div>
              <div class="w-full flex flex-col gap-2">
                <div class="w-3/4 bg-zinc-700/50 animate-pulse h-3 rounded"></div>
                <div class="w-1/2 bg-zinc-700/50 animate-pulse h-2 rounded"></div>
              </div>
            </div>
          {/each}
        {:else}
          {#each artistTopTracks.tracks as track}
            <button class="w-full text-left flex items-center gap-3 bg-zinc-800/30 border border-zinc-800/50 hover:border-zinc-600 hover:bg-zinc-800/80 p-2 transition-all duration-300 rounded-xl group/track">
              <div class="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden relative">
                <img src={track.album.images[2]?.url || track.album.images[1]?.url} alt={track.name} class="w-full h-full object-cover group-hover/track:scale-110 transition-transform duration-500" />
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover/track:opacity-100 flex items-center justify-center transition-opacity">
                   <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-white"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
              <div class="flex flex-col flex-grow min-w-0">
                <p class="text-sm font-medium text-white truncate group-hover/track:text-spotify-green transition-colors">{track.name}</p>
                <div class="flex gap-1 items-center text-xs text-zinc-400 truncate mt-0.5">
                  {#each track.artists as artist, i}
                    {#if i > 0}<span class="text-zinc-600">•</span>{/if}
                    <span class="truncate">{artist.name}</span>
                  {/each}
                </div>
              </div>
            </button>
          {/each}
        {/if}
      </div>
    </div>

    <!-- Actions -->
    <div class="w-full mt-2">
      <a
        href={artistData.uri}
        target="_blank"
        class="w-full bg-spotify-green hover:bg-[#3be477] hover:scale-[1.02] active:scale-95 text-black font-bold py-3.5 px-4 rounded-full transition-all duration-300 flex items-center justify-center shadow-[0_0_20px_rgba(29,185,84,0.3)] hover:shadow-[0_0_25px_rgba(29,185,84,0.5)]"
      >
        <span class="text-sm">Open in Spotify</span>
      </a>
    </div>
  </div>
</article>

<style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #3f3f46;
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #52525b;
  }
</style>
