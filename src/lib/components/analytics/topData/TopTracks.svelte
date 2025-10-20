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

  import { ArrowDownNarrowWide } from "@lucide/svelte";
  import { formatDuration } from "$lib/global/functions";
  import sortArray from "sort-array";

  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import SortBy from "$lib/components/common/SortBy.svelte";

  let { topTracks_ } = $props();

  let topTracks = $state([]);
  $effect(() => {
    topTracks = topTracks_.items.map((track: any, index: number) => ({
      ...track,
      rank: index + 1,
    }));
    //topTracks = topTracks_.items;
  });

  const fields: string[] = [
    "Rank",
    "Track",
    "Artist(s)",
    "Duration",
    "Popularity",
    "Actions",
  ];

  // State
  let page = $state(1);
  const size = 10;
  const slicedSource = $derived((s: any) =>
    s.slice((page - 1) * size, page * size)
  );

  //Filters
  const filter = [
    { name: "Rank", path: "rank" },
    { name: "Track", path: "name" },
    { name: "Duration", path: "duration_ms" },
    { name: "Popularity", path: "popularity" },
  ];

  let isAscending = $state(true);
  let activeFilter = $state(filter[0]);

  function onFilterChange(e: Event) {
    const selectedName = (e.target as HTMLSelectElement).value;
    activeFilter = filter.find((f) => f.name === selectedName) ?? filter[0];
    applySort();
  }

  function toggleAscDesc() {
    isAscending = !isAscending;
    applySort();
  }

  function applySort() {
    topTracks = sortArray(topTracks, {
      by: activeFilter.path,
      order: isAscending ? "asc" : "desc",
    });
  }
</script>

<div>
  <SortBy
    {filter}
    {onFilterChange}
    {toggleAscDesc}
    {activeFilter}
    {isAscending}
  />
</div>
<div class=" rounded-lg shadow-lg w-full overflow-x-auto">
  <table class="w-full divide-y divide-gray-200">
    <TableHeadSnippet {fields} />
    <tbody class=" divide-y divide-gray-200">
      {#key activeFilter.name}
        {#each slicedSource(topTracks) as track, idx (track)}
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
          >
            <td class={tdClass}>
              <p class="text-lg">
                {track.rank}
              </p>
            </td>
            <td class="{tdClass} flex gap-2">
              <div class="w-10 h-10">
                <img
                  src={track.album.images[2].url}
                  alt={track.name}
                  loading="lazy"
                  class="cover rounded-lg w-full h-full"
                />
              </div>
              <div class="text-sm font-medium my-auto">
                {track.name}
              </div>
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

            <td class={tdClass}>
              <Modal cardType="track" actionName="..." cardData={track} />
              <!--
          
              <button>
                <Ellipsis />
              </button>
            -->
            </td>
          </tr>
        {/each}
      {/key}
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
