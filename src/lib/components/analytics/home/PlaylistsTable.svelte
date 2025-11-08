<script lang="ts">
  let { playlists } = $props();

  console.log("this is the playlist", playlists);
</script>

<section class="mx-10">
  <header
    class="text-center border-1 border-spotify-green w-fit mx-auto px-10 rounded-sm mb-5"
  >
    <h3 class="">Playlists</h3>
    <p class="text-sm font-semibold">
      <span class="font-medium text-gray-800 dark:text-gray-200"
        >Total Playlists :</span
      >
      {playlists.total}
    </p>
  </header>

  <input
    type="text"
    placeholder="Search Playlists"
    class="bg-gray-500 rounded-lg px-10 py-2 text-lg mb-5"
  />

  <article class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
    {#each playlists.items as playlist}
      <button
        class="flex justify-start gap-5 bg-spotify-green px-5 py-2 rounded-sm max-w-[500px]"
      >
        <!-- fixed width so items don’t collapse -->
        <div>
          <img
            src={playlist.images[0].url}
            alt={playlist.name}
            class="w-15 h-15 object-cover"
            loading="lazy"
          />
        </div>
        <div class="text-left">
          <p class="">
            {playlist.name}
          </p>
          <div>
            <p class="text-xs text-gray-500">
              Created by:
              <span class="text-sm font-semibold text-white">
                {playlist.owner.display_name}
              </span>
            </p>
            <p class="text-xs text-gray-500">
              Tracks:
              <span class="text-sm font-semibold text-white"
                >{playlist.tracks.total}</span
              >
            </p>
          </div>
        </div>
        <div class="float">
          <span class="text-[7px] px-2 py-1 bg-gray-100 text-gray-600 rounded">
            {playlist.collaborative ? "Collaborative" : "Solo"}
          </span>
        </div>
      </button>
    {/each}
  </article>
</section>
