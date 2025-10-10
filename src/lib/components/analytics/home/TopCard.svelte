<script lang="ts">
  let { title, data, action, type, background } = $props();

  console.log(type, "-----", data);
</script>

<article class=" min-w-40 w-full max-w-[400px] bg-{background} px-3 mx-5">
  <h3 class="text-center font-bold">{title}</h3>
  <div class="">
    {#each data as d, idx}
      <div>
        <div class=" text-xs md:text-md font-semibold flex gap-6">
          <div class="w-2">#{idx + 1}</div>
          {#if type == "top-tracks"}
            <p>{d.name}</p>
          {/if}
          {#if type == "top-artists"}
            <p>{d.name}</p>
          {/if}
          {#if type == "top-recent"}
            <p>{d.track.name}</p>
          {/if}
        </div>
        <div class="text-xs font-medium text-spotify-black/50 flex gap-6">
          <div class="w-2"></div>
          {#if type == "top-tracks"}
            <p>{d.id}</p>
          {/if}
          {#if type == "top-artists"}
            <p>{d.id}</p>
          {/if}
          {#if type == "top-recent"}
            <p>{d.track.id}</p>
          {/if}
        </div>
      </div>
    {/each}
  </div>
  <div>
    <button onclick={() => action(type)} class="float-right">
      View more >>
    </button>
  </div>
</article>
