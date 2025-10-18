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

  const fields: string[] = [
    "Rank",
    "Artists",
    "Followers",
    "Genres",
    "Actions",
    "",
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
<div>
  <div class="table-wrap overflow-x-auto">
    <table class="table caption-bottom">
      <caption class="pt-4">Top Aritsts</caption>
      <TableHeadSnippet {fields} />
      <tbody class="[&>tr]:hover:bg-surface-500/80">
        {#each slicedSource(topArtists) as artists}
          <tr>
            <td class={tdClass}>{artists.rank}</td>
            <td class={tdClass}>
              {artists.name}
            </td>
            <td class={tdClass}
              >{formatFollowerCount(artists.followers.total)}</td
            >
            <td class={tdClass}>{artists.genres}</td>
            <td class={tdClass}>
              <a href={artists.uri} class="text-spotify-green !text-right">
                Open in spotify</a
              ></td
            >
            <td class={tdClass}>
              <Modal cardType="artist" actionName="..." cardData={artists} />
            </td>
          </tr>
        {/each}
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
