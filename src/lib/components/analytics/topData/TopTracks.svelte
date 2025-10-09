<script lang="ts">
  import TableHeadSnippet from "./TableHeadSnippet.svelte";
  import { tdClass } from "$lib/utils/table";
  import { Pagination } from "@skeletonlabs/skeleton-svelte";
  import Modal from "$lib/components/common/Modal.svelte";
  // Icons
  import IconArrowLeft from "@lucide/svelte/icons/arrow-left";
  import IconArrowRight from "@lucide/svelte/icons/arrow-right";
  import IconEllipsis from "@lucide/svelte/icons/ellipsis";
  import IconFirst from "@lucide/svelte/icons/chevrons-left";
  import IconLast from "@lucide/svelte/icons/chevron-right";
  import Ellipsis from "@lucide/svelte/icons/ellipsis";

  let { topTracks_ } = $props();
  //console.log("Top tracks, ", topTracks);

  // Utility function to format duration
  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const fields: string[] = [
    "S/N",
    "Track",
    "Artist(s)",
    "Duration",
    "Popularity",
    "Actions",
  ];

  let topTracks = $state([]);

  // State
  let page = $state(1);
  const size = 10;
  const slicedSource = $derived((s: any) =>
    s.slice((page - 1) * size, page * size)
  );

  $effect(() => {
    topTracks = topTracks_.items;
  });
</script>

<div class=" rounded-lg shadow-lg w-full overflow-x-auto">
  <table class="w-full divide-y divide-gray-200">
    <TableHeadSnippet {fields} />
    <tbody class=" divide-y divide-gray-200">
      {#each slicedSource(topTracks) as track, idx}
        <tr
          class="hover:bg-surface-500/50 transition-colors duration-200 ease-in-out"
        >
          <td class={tdClass}>
            <p class="text-lg">
              {idx + 1}
            </p>
          </td>
          <td class={tdClass}>
            <div class="text-sm font-medium">{track.name}</div>
            <div class="text-xs text-gray-500">ID: {track.id}</div>
          </td>
          <td class={tdClass}>
            <div class="text-sm">
              {#each track.artists as artist, idx}
                <span>
                  {artist.name}
                  {idx < track.artists.length - 1 && ", "}
                </span>
              {/each}
            </div>
          </td>
          <td class="{tdClass} text-sm">
            {formatDuration(track.duration_ms)}
          </td>
          <td class={tdClass}>
            <div class="flex items-center">
              <div class="text-sm font-medium">
                {track.popularity}
              </div>
              <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                <div
                  class="bg-green-500 h-2 rounded-full"
                  style={`width: ${track.popularity}%`}
                ></div>
              </div>
            </div>
          </td>
          <td class="{tdClass} text-sm">
            <a
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              class="text-spotify-green hover:text-green-900 dark:hover:text-green-300 font-medium"
            >
              Open in Spotify
            </a>
          </td>
          <td class={tdClass}>
            <Modal cardType="track" actionName="..." />
            <!--
          
              <button>
                <Ellipsis />
              </button>
            -->
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
<footer class="flex justify-center">
  <!-- Pagination -->
  <Pagination
    data={topTracks}
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
