<script lang="ts">
  let { artists } = $props();
</script>

<div class="mt-5 mx-auto text-center">
  <h5>Artists</h5>
  <div class="flex gap-2 flex-wrap">
    {#each artists as artist}
      <a
        href={artist.uri}
        class="border-1 border-spotify-green rounded-sm px-3 text-xs sm:text-sm md:text-md hover:scale-105 hover:bg-spotify-green transition duration-200 ease-in-out"
      >
        {artist.name}
      </a>
    {/each}
  </div>
</div>
