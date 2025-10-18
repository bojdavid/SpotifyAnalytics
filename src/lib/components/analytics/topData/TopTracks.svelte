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
  <label for="filter" class="mr-2">Sort by:</label>
  <select id="filter" onchange={onFilterChange} bind:value={activeFilter.name}>
    {#each filter as f}
      <option value={f.name}>{f.name}</option>
    {/each}
  </select>
  <button
    class="transform {isAscending
      ? 'rotate-180'
      : ''} transition-all duration-300 ease-in-out"
    onclick={() => toggleAscDesc()}
  >
    <ArrowDownNarrowWide size={30} />
  </button>
</div>
<div class=" rounded-lg shadow-lg w-full overflow-x-auto">
  <table class="w-full divide-y divide-gray-200">
    <TableHeadSnippet {fields} />
    <tbody class=" divide-y divide-gray-200">
      {#each slicedSource(topTracks) as track}
        <tr
          class="hover:bg-surface-500/50 transition-colors duration-200 ease-in-out"
        >
          <td class={tdClass}>
            <p class="text-lg">
              {track.rank}
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
            <Modal cardType="track" actionName="..." cardData={track} />
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
