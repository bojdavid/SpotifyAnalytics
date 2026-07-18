<script lang="ts">
  import { Pagination } from "@skeletonlabs/skeleton-svelte";
  // Icons
  import IconArrowLeft from "@lucide/svelte/icons/arrow-left";
  import IconArrowRight from "@lucide/svelte/icons/arrow-right";
  import IconEllipsis from "@lucide/svelte/icons/ellipsis";
  import IconFirst from "@lucide/svelte/icons/chevrons-left";
  import IconLast from "@lucide/svelte/icons/chevron-right";
  import { ArrowDownNarrowWide } from "@lucide/svelte";

  import type { TopArtistsType } from "$lib/types/spotifyTypes1";
  import TableHeadSnippet from "./TableHeadSnippet.svelte";
  import { tdClass } from "$lib/utils/table";
  import { formatFollowerCount } from "$lib/global/functions";

  import Modal from "$lib/components/common/Modal.svelte";
  import sortArray from "sort-array";
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";

  import SortBy from "$lib/components/common/SortBy.svelte";

  let { topArtists_ } = $props();

  let topArtists: TopArtistsType[] = $state([]);

  $effect(() => {
    topArtists = topArtists_.items.map((artist: any, index: number) => ({
      ...artist,
      rank: index + 1,
    }));
    //topArtists = topArtists_.items;
  });

  // State
  let page = $state(1);
  const size = 10;
  const slicedSource = $derived((s: TopArtistsType[]) =>
    s.slice((page - 1) * size, page * size)
  );

  const fields = [
    { field: "Rank", hideOnMobile: false },
    { field: "Artists", hideOnMobile: false },
    { field: "Followers", hideOnMobile: false },
    { field: "Genres", hideOnMobile: true },
  ];

  //Filters
  const filter = [
    { name: "Rank", path: "rank" },
    { name: "Artists", path: "name" },
    { name: "Followers", path: "followers.total" },
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
    topArtists = sortArray(topArtists, {
      by: activeFilter.path,
      order: isAscending ? "asc" : "desc",
    });
  }

  //handle dialog
  let activeArtistIndex: number = $state(0);
  let openModal: boolean = $state(false);
  const setActiveIndex = (i: any) => {
    activeArtistIndex = i;
    openModal = true;
    console.log(topArtists[activeArtistIndex]);
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

<div class="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 rounded-2xl shadow-2xl w-full overflow-hidden mb-8">
  <div class="overflow-x-auto w-full">
    <table class="w-full whitespace-nowrap text-left border-collapse">
      <TableHeadSnippet {fields} />
      <tbody class="divide-y divide-zinc-800/50">
        {#key activeFilter.name}
          {#each slicedSource(topArtists) as artists, idx (artists)}
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
                if (artists.rank) {
                  setActiveIndex(artists.rank - 1);
                }
              }}
            >
              <td class="{tdClass} py-4 px-6 text-zinc-400 font-medium">
                <span class="bg-zinc-800 text-zinc-300 rounded-md px-2.5 py-1 text-xs shadow-inner">{artists.rank}</span>
              </td>
              <td class="{tdClass} py-4 px-6 flex items-center gap-4">
                <div class="w-12 h-12 flex-shrink-0 relative overflow-hidden rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300 border-2 border-zinc-700/50 group-hover:border-spotify-green/50">
                  <img
                    src={artists.images[2]?.url || artists.images[1]?.url}
                    alt={artists.name}
                    loading="lazy"
                    class="object-cover w-full h-full"
                  />
                </div>
                <div class="text-base font-bold text-white group-hover:text-spotify-green transition-colors">
                  {artists.name}
                </div>
              </td>
              <td class="{tdClass} py-4 px-6 text-zinc-300 font-medium">
                {formatFollowerCount(artists.followers.total)}
              </td>
              <td class="{tdClass} py-4 px-6 hidden md:table-cell">
                <div class="flex flex-wrap gap-1.5 max-w-[300px]">
                  {#each (artists.genres || []).slice(0, 3) as genre}
                    <span class="text-[10px] font-bold tracking-widest px-2 py-1 bg-zinc-800/60 text-zinc-400 border border-zinc-700/50 rounded-full">
                      {genre}
                    </span>
                  {/each}
                  {#if artists.genres?.length > 3}
                    <span class="text-[10px] font-bold px-2 py-1 text-zinc-500">+{artists.genres.length - 3}</span>
                  {/if}
                </div>
              </td>
            </tr>
          {/each}
        {/key}
      </tbody>
      <tfoot class="bg-zinc-950/50 border-t border-zinc-800">
        <tr>
          <td colspan="3" class="py-3 px-6 text-xs text-zinc-500 uppercase tracking-wider font-bold">Total Artists</td>
          <td class="py-3 px-6 text-right text-xs text-zinc-400 font-medium hidden md:table-cell">{topArtists.length} Elements</td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>

<Modal
  cardType="artist"
  actionName="..."
  cardData={topArtists[activeArtistIndex]}
  {openModal}
  {closeModalFromParent}
/>

<!-- Footer -->
<footer class="flex justify-center mb-8">
  <!-- Pagination -->
  <Pagination
    data={topArtists}
    {page}
    onPageChange={(e) => (page = e.page)}
    pageSize={size}
    siblingCount={4}
  >
    {#snippet labelEllipsis()}<IconEllipsis class="size-4 text-zinc-400" />{/snippet}
    {#snippet labelNext()}<IconArrowRight class="size-4 text-zinc-400" />{/snippet}
    {#snippet labelPrevious()}<IconArrowLeft class="size-4 text-zinc-400" />{/snippet}
    {#snippet labelFirst()}<IconFirst class="size-4 text-zinc-400" />{/snippet}
    {#snippet labelLast()}<IconLast class="size-4 text-zinc-400" />{/snippet}
  </Pagination>
</footer>
