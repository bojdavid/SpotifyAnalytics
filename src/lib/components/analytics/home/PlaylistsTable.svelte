<script lang="ts">
  import { setCurrentPlaylist } from "$lib/global/playlist.svelte";
  import { goto } from "$app/navigation";
  import { Search, Music } from "@lucide/svelte";
  let { playlists } = $props();

  let searchQuery: string = $state("");
  let filteredPlaylists: any[] = $state(playlists?.items || []);

  const updateFIlterPlaylist = () => {
    if (!playlists?.items) return;
    filteredPlaylists = playlists.items.filter((playlist: any) =>
      playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
</script>

<section class="w-full mt-10">
  <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
    <div class="flex flex-col">
      <h3 class="h2 font-bold flex items-center gap-3">
        <Music size={28} class="text-[var(--color-spotify-green)]" />
        Your Playlists
      </h3>
      <p class="text-surface-500-400-token text-sm font-medium mt-1">
        Showing {filteredPlaylists.length} of {playlists?.total || 0} playlists
      </p>
    </div>

    <!-- Search Input -->
    <div class="relative w-full sm:w-72">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} class="text-surface-400-500-token" />
      </div>
      <input
        type="text"
        placeholder="Search Playlists..."
        class="input w-full pl-10 py-2 bg-surface-200-700-token border-none focus:ring-2 focus:ring-[var(--color-spotify-green)] rounded-full text-sm placeholder:text-surface-400-500-token transition-all shadow-inner"
        bind:value={searchQuery}
        oninput={updateFIlterPlaylist}
      />
    </div>
  </header>

  <article class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
    {#each filteredPlaylists as playlist}
      <button
        class="card card-hover p-4 flex gap-4 items-center bg-surface-100-800-token border border-surface-200-700-token shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--color-spotify-green)]/50 group text-left w-full rounded-2xl"
        onclick={() => {
          setCurrentPlaylist(playlist);
          goto("/analytics/playlists");
        }}
      >
        <div class="relative flex-shrink-0">
          <img
            src={playlist.images?.[0]?.url || "https://ui-avatars.com/api/?name=" + playlist.name}
            alt={playlist.name}
            class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
            loading="lazy"
          />
          {#if playlist.collaborative}
            <div class="absolute -bottom-2 -right-2 bg-[var(--color-spotify-green)] text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-surface-100-800-token shadow-sm">
              Collab
            </div>
          {/if}
        </div>
        
        <div class="flex flex-col justify-center min-w-0 flex-1">
          <p class="font-bold text-surface-900-50-token truncate text-base sm:text-lg group-hover:text-[var(--color-spotify-green)] transition-colors duration-200">
            {playlist.name}
          </p>
          <div class="mt-1 space-y-0.5">
            <p class="text-xs text-surface-500-400-token truncate">
              By <span class="font-semibold text-surface-700-200-token">{playlist.owner.display_name}</span>
            </p>
            <p class="text-xs text-surface-500-400-token">
              {playlist.tracks.total} <span class="opacity-75">tracks</span>
            </p>
          </div>
        </div>
      </button>
    {:else}
      <div class="col-span-full py-12 text-center text-surface-500-400-token flex flex-col items-center gap-3">
        <Music size={48} class="opacity-20" />
        <p>No playlists found matching "{searchQuery}"</p>
      </div>
    {/each}
  </article>
</section>
