<script lang="ts">
  import TableHeadSnippet from "./TableHeadSnippet.svelte";
  import { tdClass, hideOnMobile } from "$lib/utils/table";
  import { Pagination } from "@skeletonlabs/skeleton-svelte";
  import Modal from "$lib/components/common/Modal.svelte";

  // Icons
  import IconArrowLeft from "@lucide/svelte/icons/arrow-left";
  import IconArrowRight from "@lucide/svelte/icons/arrow-right";
  import IconEllipsis from "@lucide/svelte/icons/ellipsis";
  import IconFirst from "@lucide/svelte/icons/chevrons-left";
  import IconLast from "@lucide/svelte/icons/chevron-right";
  import { ArrowDownNarrowWide } from "@lucide/svelte";
  import { formatDuration, timeElapsedSince } from "$lib/global/functions";
  import sortArray from "sort-array";

  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import SortBy from "$lib/components/common/SortBy.svelte";

  let { recentTracks_ } = $props();
  //console.log("Top tracks, ", topTracks);

  const fields = [
    { field: "Rank", hideOnMobile: false },
    { field: "Track", hideOnMobile: false },
    { field: "Artists(s)", hideOnMobile: true },
    { field: "Last Played", hideOnMobile: false },
    { field: "Popularity", hideOnMobile: true },
    { filed: "Actions", hideOnMobile: false },
  ];

  let recentTracks: any[] = $state([]);

  // State
  let page = $state(1);
  const size = 10;
  const slicedSource = $derived((s: any) =>
    s.slice((page - 1) * size, page * size),
  );

  $effect(() => {
    recentTracks = recentTracks_.items.map((track: any, index: number) => ({
      ...track,
      rank: index + 1,
    }));
    //recentTracks = recentTracks_.items;
  });
  //console.log("THis is the recentr", $state.snapshot(recentTracks_));

  //Filters
  const filter = [
    { name: "Rank", path: "rank" },
    { name: "Track", path: "track.name" },
    { name: "Duration", path: "track.duration_ms" },
    { name: "Popularity", path: "track.popularity" },
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
    recentTracks = sortArray(recentTracks, {
      by: activeFilter.path,
      order: isAscending ? "asc" : "desc",
    });
  }

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

<div class="mb-6 flex justify-end">
  <SortBy
    {filter}
    {onFilterChange}
    {toggleAscDesc}
    {activeFilter}
    {isAscending}
  />
</div>

<div
  class="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 rounded-2xl shadow-2xl w-full overflow-hidden mb-8"
>
  <div class="overflow-x-auto w-full">
    <table class="w-full whitespace-nowrap text-left border-collapse">
      <TableHeadSnippet {fields} />
      <tbody class="divide-y divide-zinc-800/50">
        {#key activeFilter.name}
          {#each slicedSource(recentTracks) as recentT, idx (recentT)}
            <tr
              class="group hover:bg-zinc-800/40 transition-colors duration-300 cursor-pointer"
              in:fly={{
                x: -24,
                y: 0,
                opacity: 0,
                duration: 220,
                delay: idx * 50,
              }}
              animate:flip
              onclick={() => {
                if (recentT.rank) {
                  setActiveIndex(recentT.rank - 1);
                }
              }}
            >
              <td class="{tdClass} py-4 px-6 text-zinc-400 font-medium w-16">
                <span
                  class="bg-zinc-800 text-zinc-300 rounded-md px-2.5 py-1 text-xs shadow-inner"
                  >{recentT.rank}</span
                >
              </td>
              <td
                class="{tdClass} py-4 px-6 flex items-center gap-4 min-w-[250px]"
              >
                <div
                  class="w-12 h-12 flex-shrink-0 relative overflow-hidden rounded-md shadow-md group-hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={recentT.track.album.images[2]?.url ||
                      recentT.track.album.images[1]?.url}
                    alt={recentT.track.name}
                    loading="lazy"
                    class="object-cover w-full h-full"
                  />
                  <!-- Hover Play Overlay -->
                  <div
                    class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-5 h-5 text-white"><path d="M8 5v14l11-7z" /></svg
                    >
                  </div>
                </div>
                <div
                  class="text-base font-bold text-white group-hover:text-spotify-green transition-colors truncate"
                >
                  {recentT.track.name}
                </div>
              </td>
              <td
                class="{tdClass} py-4 px-6 hidden md:table-cell text-zinc-400 text-sm max-w-[200px] truncate"
              >
                <div class="truncate">
                  {#each recentT.track.artists as artist, i}
                    {#if i > 0}<span class="text-zinc-600 px-1">•</span>{/if}
                    <span class="hover:text-white transition-colors"
                      >{artist.name}</span
                    >
                  {/each}
                </div>
              </td>
              <td class="{tdClass} py-4 px-6 text-zinc-400 font-medium text-sm">
                <span
                  class="bg-zinc-800/80 border border-zinc-700/50 px-2.5 py-1 rounded-md text-xs"
                  >{timeElapsedSince(recentT.played_at)} ago</span
                >
              </td>
              <td class="{tdClass} py-4 px-6 hidden md:table-cell">
                <div class="flex items-center gap-3">
                  <div class="text-xs font-bold text-zinc-300 w-6 text-right">
                    {recentT.track.popularity}
                  </div>
                  <div
                    class="w-24 bg-zinc-700/50 rounded-full h-1.5 overflow-hidden"
                  >
                    <div
                      class="bg-spotify-green h-full rounded-full shadow-[0_0_8px_rgba(29,185,84,0.6)]"
                      style={`width: ${recentT.track.popularity}%`}
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
          {/each}
        {/key}
      </tbody>
      <tfoot class="bg-zinc-950/50 border-t border-zinc-800">
        <tr>
          <td
            colspan="4"
            class="py-3 px-6 text-xs text-zinc-500 uppercase tracking-wider font-bold"
            >Total Listens</td
          >
          <td
            class="py-3 px-6 text-right text-xs text-zinc-400 font-medium hidden md:table-cell"
            >{recentTracks.length} Elements</td
          >
        </tr>
      </tfoot>
    </table>
  </div>
</div>

<Modal
  cardType="track"
  cardData={recentTracks[activeTrackIndex].track}
  {openModal}
  {closeModalFromParent}
/>

<footer class="flex justify-center mb-8">
  <!-- Pagination -->
  <Pagination
    data={recentTracks}
    {page}
    onPageChange={(e) => (page = e.page)}
    pageSize={size}
    siblingCount={4}
  >
    {#snippet labelEllipsis()}<IconEllipsis
        class="size-4 text-zinc-400"
      />{/snippet}
    {#snippet labelNext()}<IconArrowRight
        class="size-4 text-zinc-400"
      />{/snippet}
    {#snippet labelPrevious()}<IconArrowLeft
        class="size-4 text-zinc-400"
      />{/snippet}
    {#snippet labelFirst()}<IconFirst class="size-4 text-zinc-400" />{/snippet}
    {#snippet labelLast()}<IconLast class="size-4 text-zinc-400" />{/snippet}
  </Pagination>
</footer>
