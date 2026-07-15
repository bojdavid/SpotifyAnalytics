<script lang="ts">
  let { title, data, action, type, background = "bg-surface-500" } = $props();
  import { timeElapsedSince } from "$lib/global/functions";

  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
</script>

<article
  class="w-full h-full flex flex-col {background} p-4 sm:p-5 rounded-2xl shadow-md transition-shadow hover:shadow-lg relative overflow-hidden"
>
  <h3 class="text-center font-bold text-lg sm:text-xl md:h3 mb-6 text-surface-900-50-token">{title}</h3>
  <div class="flex-grow flex flex-col gap-4 z-10">
    {#each data as d, idx (d)}
      <div
        in:fly={{
          x: -24,
          y: 0,
          opacity: 0,
          duration: 220,
          delay: idx * 80,
        }}
        animate:flip={{ duration: 300 }}
      >
        <div class="flex items-center gap-3 group">
          <div class="text-xs sm:text-sm font-bold text-surface-400-500-token w-4 sm:w-5 text-right flex-shrink-0">#{idx + 1}</div>
          <figure class="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            {#if type == "top-tracks"}
              <img
                src={d.album.images[2].url}
                alt={d.name}
                class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md shadow-sm group-hover:shadow transition-shadow flex-shrink-0"
              />
              <figcaption class="flex flex-col min-w-0 flex-1">
                <span class="text-sm sm:text-base font-bold text-surface-900-50-token line-clamp-2 leading-tight group-hover:text-[var(--color-spotify-green)] transition-colors">
                  {d.name}
                </span>
                <div class="text-[10px] sm:text-xs text-surface-600-300-token flex items-center gap-1 mt-0.5 flex-wrap">
                  {#each d.artists as artist, i}
                    {#if i > 0}
                      <span class="w-1 h-1 rounded-full bg-surface-400-500-token mx-0.5"></span>
                    {/if}
                    <a class="hover:text-surface-900-50-token hover:underline" href={artist.uri}>
                      {artist.name}
                    </a>
                  {/each}
                </div>
              </figcaption>
            {/if}
            {#if type == "top-artists"}
              <img
                src={d.images[2]?.url || d.images[0]?.url}
                alt={d.name}
                class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full shadow-sm group-hover:shadow transition-shadow flex-shrink-0"
              />
              <figcaption class="text-sm sm:text-base font-bold text-surface-900-50-token line-clamp-2 leading-tight group-hover:text-[var(--color-spotify-green)] transition-colors flex-1 min-w-0">
                {d.name}
              </figcaption>
            {/if}
            {#if type == "top-recent"}
              <img
                src={d.track.album.images[2].url}
                alt={d.track.name}
                class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md shadow-sm group-hover:shadow transition-shadow flex-shrink-0"
              />
              <figcaption class="flex flex-col min-w-0 flex-1">
                <span class="text-sm sm:text-base font-bold text-surface-900-50-token line-clamp-2 leading-tight group-hover:text-[var(--color-spotify-green)] transition-colors">
                  {d.track.name}
                </span>
                <p class="text-[10px] sm:text-xs font-medium text-surface-600-300-token mt-0.5 flex-wrap flex">
                  <span class="opacity-75 font-normal mr-1">Last played: </span>
                  {timeElapsedSince(d.played_at)} ago
                </p>
              </figcaption>
            {/if}
          </figure>
        </div>
      </div>
    {/each}
  </div>
  <div class="mt-6 pt-4 border-t border-surface-900-50-token/10 z-10 flex justify-end">
    <button onclick={() => action(type)} class="text-xs sm:text-sm font-bold text-surface-700-200-token hover:text-[var(--color-spotify-green)] transition-colors flex items-center gap-1">
      View more <span aria-hidden="true">&rarr;</span>
    </button>
  </div>
</article>
