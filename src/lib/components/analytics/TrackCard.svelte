<script lang="ts">
  import { PlusCircle } from "@lucide/svelte";
  const genres = ["genre1", "genre2", "genre3", "genre4", "genre5"];

  let {} = $props();
</script>

<article class=" min-w-[250px] max-w-[1000px] w-full px-5">
  <div class="flex justify-space-between sm:flex-row flex-col">
    <div>
      <header class="flex gap-5 justify-between pt-5">
        <div>
          <h2>Track Name</h2>
          <p class="text-xs text-surface-400">Artist Name</p>
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

      <!-- Genre Container -->
      <div class="mt-5">
        <h4>Genres</h4>
        <div class="flex gap-2 flex-wrap">
          {#each genres as genre}
            <div
              class="border-1 border-spotify-green rounded-sm px-3 text-xs sm:text-sm md:text-md"
            >
              {genre}
            </div>
          {/each}
        </div>
      </div>
    </div>
    <!-- Image container -->
    <div
      class="mt-5 border-2 border-spotify-green rounded-full w-40 h-40 md:w-60 md:h-60 mx-auto shadow-lg shadow-spotify-green hover:shadow-xl transition duration-300 ease-in-out"
    ></div>
  </div>

  <p class=" mt-5">Preview Song</p>
  <p class=" mt-5">popularity: 60%</p>
  <p class=" mt-5">This track has explicit lyrics</p>
  <p class=" mt-5">Restrictions</p>

  <!-- Genre Container -->
  <div class="mt-5">
    <h4>Market</h4>
    <div class="flex gap-2 flex-wrap">
      {#each genres as genre}
        <div
          class="border-1 border-spotify-green rounded-sm px-3 text-xs sm:text-sm md:text-md"
        >
          {genre}
        </div>
      {/each}
    </div>
  </div>

  <!-- Actions-->
  <div class="flex justify-end mt-5">
    <button
      class="text-spotify-green font-bold px-5 py-2 rounded-lg flex text-sm"
    >
      Open In Spotify
    </button>
  </div>
</article>
