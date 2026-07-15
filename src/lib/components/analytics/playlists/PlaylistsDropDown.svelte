<script lang="ts">
  import { ChevronDown, Search, Music, ListMusic } from "@lucide/svelte";
  let { playlists, activePlaylist, updateActivePlaylist } = $props();

  let detailsDropDown: HTMLDetailsElement | undefined = $state();

  const setCurrentPlaylist = (playlist: any) => {
    updateActivePlaylist(playlist);
    if (detailsDropDown) {
      detailsDropDown.open = false;
    }
  };

  let searchQuery: string = $state("");
  let filteredPlaylists: any[] = $state(playlists?.items || []);

  const updateFIlterPlaylist = () => {
    if (!playlists?.items) return;
    filteredPlaylists = playlists.items.filter((playlist: any) =>
      playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
</script>

<details bind:this={detailsDropDown} class="relative w-full sm:w-auto z-10 group">
  <summary class="flex items-center justify-between sm:justify-start gap-4 cursor-pointer bg-surface-100-800-token border border-surface-200-700-token shadow-sm hover:shadow-md transition-all duration-300 rounded-xl px-4 py-3 list-none">
    <div class="flex items-center gap-4">
      <img
        src={activePlaylist?.images?.[0]?.url || "https://ui-avatars.com/api/?name=" + activePlaylist?.name}
        alt="Playlist Cover"
        class="w-12 h-12 object-cover rounded-lg shadow-sm"
      />
      <div class="flex flex-col text-left">
        <span class="text-xs font-bold text-[var(--color-spotify-green)] uppercase tracking-wider mb-0.5">Current</span>
        <p class="font-bold text-surface-900-50-token text-base truncate max-w-[150px] sm:max-w-xs">
          {activePlaylist?.name}
        </p>
        <p class="text-xs text-surface-500-400-token">
          {activePlaylist?.tracks?.total} tracks
        </p>
      </div>
    </div>
    <div class="text-surface-400-500-token group-open:-scale-y-100 transition-transform duration-300">
      <ChevronDown size={24} />
    </div>
  </summary>

  <div class="absolute top-full left-0 mt-2 w-full sm:w-[400px] max-w-full bg-surface-100-800-token/95 backdrop-blur-xl border border-surface-200-700-token shadow-2xl rounded-2xl overflow-hidden flex flex-col transform opacity-0 scale-95 group-open:opacity-100 group-open:scale-100 transition-all duration-200 origin-top-left z-50">
    
    <!-- Search Header -->
    <div class="p-4 border-b border-surface-200-700-token bg-surface-200-700-token/50">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} class="text-surface-400-500-token" />
        </div>
        <input
          type="text"
          placeholder="Search your playlists..."
          class="input w-full pl-9 py-2 bg-surface-100-800-token border-none focus:ring-2 focus:ring-[var(--color-spotify-green)] rounded-lg text-sm transition-all"
          bind:value={searchQuery}
          oninput={updateFIlterPlaylist}
        />
      </div>
    </div>

    <!-- Playlist List -->
    <div class="max-h-[60vh] sm:max-h-[400px] overflow-y-auto overscroll-contain">
      {#each filteredPlaylists as playlist (playlist.id)}
        <button
          class="w-full flex items-center gap-4 px-4 py-3 hover:bg-surface-200-700-token transition-colors duration-200 border-l-4 {playlist.id === activePlaylist?.id ? 'border-[var(--color-spotify-green)] bg-surface-200-700-token/50' : 'border-transparent'}"
          onclick={() => setCurrentPlaylist(playlist)}
        >
          <img
            src={playlist.images?.[0]?.url || "https://ui-avatars.com/api/?name=" + playlist.name}
            alt={playlist.name}
            class="w-10 h-10 object-cover rounded shadow-sm"
          />
          <div class="flex flex-col items-start text-left flex-1 min-w-0">
            <p class="text-sm font-semibold text-surface-900-50-token truncate w-full {playlist.id === activePlaylist?.id ? 'text-[var(--color-spotify-green)]' : ''}">
              {playlist.name}
            </p>
            <p class="text-xs text-surface-500-400-token">
              {playlist.tracks.total} tracks
            </p>
          </div>
          {#if playlist.id === activePlaylist?.id}
            <ListMusic size={18} class="text-[var(--color-spotify-green)] opacity-80" />
          {/if}
        </button>
      {:else}
        <div class="p-8 text-center text-surface-500-400-token flex flex-col items-center gap-2">
          <Music size={32} class="opacity-20" />
          <p class="text-sm">No playlists found</p>
        </div>
      {/each}
    </div>
  </div>
</details>

<style>
  /* Hide native detail marker */
  details > summary::-webkit-details-marker {
    display: none;
  }
</style>
