<script lang="ts">
  let { searchData, activetab } = $props();
  import Modal from "$lib/components/common/Modal.svelte";

  //handle dialog
  let activeIndex: number = $state(0);
  let openModal: boolean = $state(false);
  const setActiveIndex = (i: number) => {
    activeIndex = i;
    openModal = true;
  };
  const closeModalFromParent = () => {
    openModal = false;
  };
</script>

<section class="flex flex-col items-start">
  {#if activetab == "track"}
    {#each searchData.tracks.items as track, idx}
      <button
        onclick={() => {
          setActiveIndex(idx);
        }}
      >
        {track.name}
      </button>
    {/each}
    <Modal
      cardType="track"
      cardData={searchData.tracks.items[activeIndex]}
      {openModal}
      {closeModalFromParent}
    />
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
    {#each searchData.artists.items as data, idx}
      <button
        onclick={() => {
          setActiveIndex(idx);
        }}
      >
        {#if data}
          {data.name}
        {/if}
      </button>
    {/each}
    <Modal
      cardType="track"
      cardData={searchData.artists.items[activeIndex]}
      {openModal}
      {closeModalFromParent}
    />
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
