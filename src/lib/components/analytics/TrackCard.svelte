<script lang="ts">
  import { PlusCircle } from "@lucide/svelte";
  import { formatTime, countryNames } from "$lib/global/functions";

  const genres = ["genre1", "genre2", "genre3", "genre4", "genre5"];

  let { trackData } = $props();
  console.log("This is the trackData--", trackData);
</script>

<article class=" min-w-[250px] max-w-[1000px] w-full px-5">
  <div class="flex justify-space-between sm:flex-row flex-col">
    <div>
      <header class="flex gap-5 justify-between pt-5">
        <div>
          <h2>{trackData.name}</h2>
          <!-- Album Link and Name-->
          <a class="text-xs text-surface-200" href={trackData.album.uri}>
            <span class="text-surface-400">Album : </span>
            {trackData.album.name}
          </a>

          <!-- Aritst Link and Name-->
          <div class="flex flex-wrap text-xs">
            <span class="text-surface-400">Artist: </span>
            {#each trackData.artists as artist}
              <a
                class=" text-surface-200 hover:text-surface-500"
                href={artist.href}
              >
                {artist.name}</a
              >
            {/each}
          </div>
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
      class="mt-5 border-2 border-spotify-green rounded-full w-40 h-40 md:w-60 md:h-60 mx-auto shadow-lg shadow-spotify-green hover:shadow-xl transition duration-300 ease-in-out overflow-hidden"
    >
      <img
        src={trackData.album.images[1].url}
        alt=""
        class="w-full h-full cover"
      />
    </div>
  </div>

  <p class=" mt-2">Preview Song</p>
  <p class=" mt-2">Duration: {formatTime(trackData.duration_ms)}</p>
  <p class=" mt-2">popularity: {trackData.popularity}</p>
  <p class=" mt-2">
    {trackData.explicit
      ? "This track has explicit lyrics"
      : "Track Does Not Have Explicit Lyrics"}
  </p>
  <p class=" mt-2">Disc Number : {trackData.disc_number}</p>

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
</article>
