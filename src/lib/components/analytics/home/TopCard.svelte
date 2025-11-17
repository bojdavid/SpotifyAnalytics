<script lang="ts">
  let { title, data, action, type, background = "bg-surface-500" } = $props();
  import { timeElapsedSince } from "$lib/global/functions";

  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
</script>

<article
  class=" min-w-40 w-full max-w-[400px] {background} px-3 mx-5 rounded-lg"
>
  <h3 class="text-center font-bold mt-5">{title}</h3>
  <div class="">
    {#each data as d, idx (d)}
      <div
        class="mb-3"
        in:fly={{
          x: -24,
          y: 0,
          opacity: 0,
          duration: 220,
          delay: idx * 100,
        }}
        animate:flip
      >
        <div class=" text-xs md:text-md font-semibold flex gap-2">
          <div class=" text-lg py-auto">#{idx + 1}</div>
          <figure class="flex gap-5 shadow-sm w-full">
            {#if type == "top-tracks"}
              <img
                src={d.album.images[2].url}
                alt={d.name}
                class="rounded-lg w-13 h-13 cover"
              />
              <figcaption class="text-sm md:text-lg my-auto">
                {d.name}
                <div
                  class=" text-[10px] md:text-sm font-medium text-spotify-black/50 flex gap-1"
                >
                  {#each d.artists as artist}
                    <div
                      class=" w-1 h-1 md:w-2 md:h-2 rounded-lg bg-gray-500 my-auto"
                    ></div>
                    <a class="" href={artist.uri}>
                      {artist.name}
                    </a>
                  {/each}
                </div>
              </figcaption>
            {/if}
            {#if type == "top-artists"}
              <img
                src={d.images[2].url}
                alt={d.name}
                class="rounded-lg w-13 h-13 cover"
              />
              <figcaption class=" text-sm md:text-lg my-auto">
                {d.name}
              </figcaption>
            {/if}
            {#if type == "top-recent"}
              <img
                src={d.track.album.images[2].url}
                alt={d.track.name}
                class="rounded-full w-13 h-13 cover rounded-lg"
              />
              <figcaption class="text-sm md:text-lg my-auto">
                {d.track.name}
                <div
                  class=" text-[10px] md:text-xs font-medium text-spotify-black/50 flex gap-6"
                >
                  <p class="text-[10px] font-bold">
                    <span class="text-gray-800/50 font-light"
                      >Last played:
                    </span>
                    {timeElapsedSince(d.played_at)} ago
                  </p>
                </div>
              </figcaption>
            {/if}
          </figure>
        </div>
      </div>
    {/each}
  </div>
  <div>
    <button onclick={() => action(type)} class="float-right text-lg">
      View more &gt;&gt;
    </button>
  </div>
</article>
