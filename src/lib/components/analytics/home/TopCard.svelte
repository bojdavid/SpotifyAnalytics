<script lang="ts">
  let { title, data, action, type, background = "bg-surface-500" } = $props();

  console.log(type, "-----", data);
</script>

<article class=" min-w-40 w-full max-w-[400px] {background} px-3 mx-5">
  <h3 class="text-center font-bold mt-5">{title}</h3>
  <div class="">
    {#each data as d, idx}
      <div class="mb-3">
        <div class=" text-xs md:text-md font-semibold flex gap-6">
          <div class=" text-lg py-auto">#{idx + 1}</div>
          <figure class="flex gap-5 shadow-sm w-full">
            {#if type == "top-tracks"}
              <img
                src={d.album.images[2].url}
                alt={d.name}
                class="rounded-full w-13 h-13 cover"
              />
              <figcaption class="text-lg my-auto">
                {d.name}
                <div
                  class="text-sm font-medium text-spotify-black/50 flex gap-1"
                >
                  {#each d.artists as artist}
                    <div class="w-2 h-2 rounded-lg bg-gray-500 my-auto"></div>
                    <a class="" href={artist.href}>
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
                class="rounded-full w-13 h-13 cover"
              />
              <figcaption class="text-lg my-auto">
                {d.name}
              </figcaption>
            {/if}
            {#if type == "top-recent"}
              <img
                src={d.track.album.images[2].url}
                alt={d.track.name}
                class="rounded-full w-13 h-13 cover"
              />
              <figcaption class="text-lg my-auto">
                {d.track.name}
                <div
                  class="text-xs font-medium text-spotify-black/50 flex gap-6"
                >
                  <p>{d.track.id}</p>
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
      View more >>
    </button>
  </div>
</article>
