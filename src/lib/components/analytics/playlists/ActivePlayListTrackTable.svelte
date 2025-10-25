<script lang="ts">
  import { tdClass } from "$lib/utils/table";
  import { Pagination } from "@skeletonlabs/skeleton-svelte";
  // Icons
  import IconArrowLeft from "@lucide/svelte/icons/arrow-left";
  import IconArrowRight from "@lucide/svelte/icons/arrow-right";
  import IconEllipsis from "@lucide/svelte/icons/ellipsis";
  import IconFirst from "@lucide/svelte/icons/chevrons-left";
  import IconLast from "@lucide/svelte/icons/chevron-right";

  import { formatDuration } from "$lib/global/functions";
  import Modal from "$lib/components/common/Modal.svelte";
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";

  let { playlistTracks } = $props();

  console.log("this is the playlist tracks", playlistTracks);
  const fields: string[] = ["Track", "Artist(s)", "Duration", "Popularity"];

  // State
  let page = $state(1);
  const size = 10;
  const slicedSource = $derived((s: any) =>
    s.slice((page - 1) * size, page * size)
  );

  //handle dialog
  let activeTrackIndex: number = $state(0);
  let openModal: boolean = $state(false);
  const setActiveIndex = (i: number) => {
    activeTrackIndex = i;
    openModal = true;
  };
  const closeModalFromParent = () => {
    openModal = false;
  };
</script>

<section class=" rounded-lg shadow-lg w-full overflow-x-auto">
  <table class="w-full divide-y divide-gray-200">
    <thead class="bg-surface-100/50 dark:bg-surface-800/50 backdrop-blur">
      <tr>
        {#each fields as field}
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {field}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class=" divide-y divide-gray-200">
      {#key playlistTracks.href}
        {#each slicedSource(playlistTracks.items) as track, idx (track)}
          <tr
            class="hover:bg-surface-500/50 transition-colors duration-200 ease-in-out"
            in:fly={{
              x: -24,
              y: 0,
              opacity: 0,
              duration: 220,
              delay: idx * 100,
            }}
            animate:flip
            onclick={() => setActiveIndex(idx)}
          >
            <td class="{tdClass} flex gap-2">
              <div class="w-10 h-10">
                <img
                  src={track.track.album.images[2].url}
                  alt={track.track.name}
                  loading="lazy"
                  class="cover rounded-lg w-full h-full"
                />
              </div>
              <div class="text-sm font-medium my-auto">
                {track.track.name}
              </div>
            </td>
            <td class={tdClass}>
              <div class="text-sm">
                {#each track.track.artists as artist, idx}
                  <span>
                    {artist.name}
                    {idx < track.track.artists.length - 1 && ", "}
                  </span>
                {/each}
              </div>
            </td>
            <td class="{tdClass} text-sm">
              {formatDuration(track.track.duration_ms)}
            </td>
            <td class={tdClass}>
              <div class="flex items-center">
                <div class="text-sm font-medium">
                  {track.popularity}
                </div>
                <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-green-500 h-2 rounded-full"
                    style={`width: ${track.track.popularity}%`}
                  ></div>
                </div>
              </div>
            </td>
          </tr>
        {/each}
      {/key}
    </tbody>
  </table>
  <Modal
    cardType="track"
    cardData={playlistTracks.items[activeTrackIndex].track}
    {openModal}
    {closeModalFromParent}
  />
</section>

<footer class="flex justify-center">
  <!-- Pagination -->
  <Pagination
    data={playlistTracks.items}
    {page}
    onPageChange={(e) => (page = e.page)}
    pageSize={size}
    siblingCount={4}
  >
    {#snippet labelEllipsis()}<IconEllipsis class="size-4" />{/snippet}
    {#snippet labelNext()}<IconArrowRight class="size-4" />{/snippet}
    {#snippet labelPrevious()}<IconArrowLeft class="size-4" />{/snippet}
    {#snippet labelFirst()}<IconFirst class="size-4" />{/snippet}
    {#snippet labelLast()}<IconLast class="size-4" />{/snippet}
  </Pagination>
</footer>
