<script lang="ts">
  let { searchData, activetab } = $props();
</script>

<section>
  {#if activetab == "track"}
    {#each searchData.tracks.items as track}
      <p>
        {track.name}
      </p>
    {/each}
  {:else if activetab == "album"}
    {#each searchData.albums.items as album}
      <p>
        {album.name}
      </p>
    {/each}
  {:else if activetab == "playlist"}
    {#each searchData.playlists.items as data}
      <p>
        {#if data}
          {data.name}
        {/if}
      </p>
    {/each}
  {:else if activetab == "episode"}
    {#each searchData.episodes.items as data}
      <p>
        {#if data}
          {data.name}
        {/if}
      </p>
    {/each}
  {:else if activetab == "audiobook"}
    {#each searchData.audiobooks.items as data}
      <p>
        {#if data}
          {data.name}
        {/if}
      </p>
    {/each}
  {:else if activetab == "artist"}
    {#each searchData.artists.items as data}
      <p>
        {#if data}
          {data.name}
        {/if}
      </p>
    {/each}
  {:else if activetab == "show"}
    {#each searchData.shows.items as data}
      <p>
        {#if data}
          {data.name}
        {/if}
      </p>
    {/each}
  {:else}
    <div>
      {activetab}
    </div>
  {/if}
</section>
