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
    { field: "Actions", hideOnMobile: false },
    { filed: "", hideOnMobile: false },
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

  //open dialog
  let openDialog = $state(false);
  const triggerDialog = (name: string) => {
    openDialog = true;
    console.log("artists name - ", name);
  };
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
<div>
  <div class="table-wrap overflow-x-auto">
    <table class="table caption-bottom">
      <caption class="pt-4">Top Aritsts</caption>
      <TableHeadSnippet {fields} />
      <tbody class="[&>tr]:hover:bg-surface-500/80">
        {#key activeFilter.name}
          {#each slicedSource(topArtists) as artists, idx (artists)}
            <tr
              in:fly={{
                x: -24,
                y: 0,
                opacity: 0,
                duration: 220,
                delay: idx * 100,
              }}
              animate:flip
              onclick={() => triggerDialog(artists.name)}
            >
              <td class={tdClass}>{artists.rank}</td>
              <td class="{tdClass} flex gap-2">
                <div class="w-10 h-10">
                  <img
                    src={artists.images[2].url}
                    alt={artists.name}
                    loading="lazy"
                    class="cover rounded-lg w-full h-full"
                  />
                </div>
                <div class="text-sm font-medium my-auto">
                  {artists.name}
                </div>
              </td>
              <td class={tdClass}
                >{formatFollowerCount(artists.followers.total)}</td
              >
              <td class="{tdClass} hidden md:block">{artists.genres}</td>

              <td class={tdClass}>
                <Modal cardType="artist" actionName="..." cardData={artists} />
              </td>
            </tr>
          {/each}
        {/key}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">Total</td>
          <td class="text-right">{topArtists.length} Elements</td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
<!-- Footer -->
<footer class="flex justify-center">
  <!-- Pagination -->
  <Pagination
    data={topArtists}
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
