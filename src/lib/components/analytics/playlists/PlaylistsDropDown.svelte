<script lang="ts">
  import { ChevronDown } from "@lucide/svelte";
  let { playlists, activePlaylist, updateActivePlaylist } = $props();

  let detailsDropDown: HTMLDetailsElement | undefined = $state();

  const setCurrentPlaylist = (playlist: any) => {
    updateActivePlaylist(playlist);
    if (detailsDropDown) {
      detailsDropDown.open = false;
    }
  };
</script>

<details bind:this={detailsDropDown} class="mb-10 absolute z-10">
  <summary
    class=" text-lg flex gap-10 hover:bg-spotify-green transition duration-500 ease-in-out border-1 border-spotify-green w-fit px-3 rounded-sm"
    >Current Playlist :
    <div class="flex text-xs md:text-sm">
      <img
        src={activePlaylist.images[0].url}
        alt=""
        class="w-10 h-10 cover rounded-full"
      />
      <div>
        <p class=" ">
          {activePlaylist.name}
        </p>
        <p class="text-xs">
          <span>Total Tracks: </span>
          {activePlaylist.tracks.total}
        </p>
      </div>
      <ChevronDown
        size={30}
        class={`${detailsDropDown?.open ? "rotate-45" : ""} transition ease-in-out duration-300`}
      />
    </div>
  </summary>
  <div
    class="border-spotify-green/50 border-1 rounded-sm py-2 font-bold text-lg flex flex-col gap-5 max-w-full w-[500px] h-[700px] overflow-y-scroll bg-white/50 dark:bg-spotify-black/80 backdrop-blur"
  >
    {#each playlists.items as playlist}
      <button
        value={playlist}
        class="flex gap-5 hover:bg-spotify-green/50 transition duration-300 ease-in-out px-3 {playlist.id ==
        activePlaylist.id
          ? 'bg-spotify-green'
          : ''} "
        onclick={() => setCurrentPlaylist(playlist)}
      >
        <img
          src={playlist.images[0].url}
          alt=""
          class="w-10 h-10 cover rounded-full"
        />
        <div class="flex-col flex justify-start items-start">
          <p class="text-sm">
            {playlist.name}
          </p>
          <p class="text-xs">
            <span class="font-light text-gray-500">Total Tracks: </span>
            {playlist.tracks.total}
          </p>
        </div>
      </button>
    {/each}
  </div>
</details>
