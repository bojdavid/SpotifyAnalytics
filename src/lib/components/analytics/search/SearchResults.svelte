<script lang="ts">
  let { searchData, activetab } = $props();
  import Modal from "$lib/components/common/Modal.svelte";
  import { Music, Disc, User, Radio, Mic, BookOpen, Tv } from "@lucide/svelte";

  //handle dialog
  let activeIndex: number = $state(0);
  let openModal: boolean = $state(false);
  
  const setActiveIndex = (i: number) => {
    activeIndex = i;
    openModal = true;
  };
  
  const closeModalFromParent = () => {
    openModal = false;
  };

  const getImageUrl = (item: any) => {
    if (item?.images?.length > 0) return item.images[0].url;
    if (item?.album?.images?.length > 0) return item.album.images[0].url;
    return null;
  };
</script>

{#snippet card(item: any, type: string, idx: number, icon: any)}
  <button
    class="flex flex-row items-center gap-4 text-left hover:bg-zinc-800/50 p-3 rounded-lg transition-colors group w-full"
    onclick={() => {
      if(type === 'track' || type === 'artist') {
        setActiveIndex(idx);
      }
    }}
  >
    <div class="w-12 h-12 flex-shrink-0 bg-zinc-800 rounded overflow-hidden relative shadow-md {type === 'artist' ? 'rounded-full' : ''}">
      {#if getImageUrl(item)}
        <img src={getImageUrl(item)} alt={item.name} class="w-full h-full object-cover group-hover:opacity-40 transition-opacity duration-300" />
      {:else}
        <div class="w-full h-full flex items-center justify-center text-zinc-600 bg-zinc-800 group-hover:opacity-40 transition-opacity duration-300">
          {@render icon()}
        </div>
      {/if}
      
      <!-- Hover Play Button overlay -->
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-white"><path d="M8 5v14l11-7z" /></svg>
      </div>
    </div>
    
    <div class="flex flex-col flex-grow min-w-0">
      <h3 class="font-normal text-white text-base truncate w-full group-hover:text-spotify-green transition-colors">{item.name}</h3>
      <p class="text-sm text-zinc-400 truncate w-full mt-0.5">
        {#if type === 'track'}
          {item.artists?.[0]?.name || "Unknown Artist"}
        {:else if type === 'album'}
          {item.artists?.[0]?.name || "Album"}
        {:else if type === 'playlist'}
          By {item.owner?.display_name || "Spotify"}
        {:else if type === 'artist'}
          Artist
        {:else if type === 'episode'}
          {item.release_date || "Episode"}
        {:else}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        {/if}
      </p>
    </div>
  </button>
{/snippet}

<section class="flex flex-col gap-1 w-full pb-10 overflow-y-auto max-h-[80vh] pr-2">
  {#if activetab == "track" && searchData?.tracks?.items}
    {#each searchData.tracks.items as track, idx}
      {@render card(track, 'track', idx, () => `<Music size={40} />`)}
    {/each}
    <Modal
      cardType="track"
      cardData={searchData.tracks.items[activeIndex]}
      {openModal}
      {closeModalFromParent}
    />
    
  {:else if activetab == "album" && searchData?.albums?.items}
    {#each searchData.albums.items as album, idx}
      {@render card(album, 'album', idx, () => `<Disc size={40} />`)}
    {/each}
    
  {:else if activetab == "playlist" && searchData?.playlists?.items}
    {#each searchData.playlists.items as playlist, idx}
      {@render card(playlist, 'playlist', idx, () => `<Radio size={40} />`)}
    {/each}
    
  {:else if activetab == "episode" && searchData?.episodes?.items}
    {#each searchData.episodes.items as episode, idx}
      {@render card(episode, 'episode', idx, () => `<Mic size={40} />`)}
    {/each}
    
  {:else if activetab == "audiobook" && searchData?.audiobooks?.items}
    {#each searchData.audiobooks.items as audiobook, idx}
      {@render card(audiobook, 'audiobook', idx, () => `<BookOpen size={40} />`)}
    {/each}
    
  {:else if activetab == "artist" && searchData?.artists?.items}
    {#each searchData.artists.items as artist, idx}
      {@render card(artist, 'artist', idx, () => `<User size={40} />`)}
    {/each}
    <Modal
      cardType="track"
      cardData={searchData.artists.items[activeIndex]}
      {openModal}
      {closeModalFromParent}
    />
    
  {:else if activetab == "show" && searchData?.shows?.items}
    {#each searchData.shows.items as show, idx}
      {@render card(show, 'show', idx, () => `<Tv size={40} />`)}
    {/each}
    
  {:else}
    <div class="w-full flex justify-center items-center py-20">
      <p class="text-zinc-500 text-lg">No results found for {activetab}.</p>
    </div>
  {/if}
</section>
