<script lang="ts">
  import { Pagination } from "@skeletonlabs/skeleton-svelte";
  // Icons
  import IconArrowLeft from "@lucide/svelte/icons/arrow-left";
  import IconArrowRight from "@lucide/svelte/icons/arrow-right";
  import IconEllipsis from "@lucide/svelte/icons/ellipsis";
  import IconFirst from "@lucide/svelte/icons/chevrons-left";
  import IconLast from "@lucide/svelte/icons/chevron-right";
  import Ellipsis from "@lucide/svelte/icons/ellipsis";

  import type { TopArtistsType } from "$lib/types/spotifyTypes1";
  import TableHeadSnippet from "./TableHeadSnippet.svelte";
  import { tdClass } from "$lib/utils/table";

  import Modal from "$lib/components/common/Modal.svelte";

  let { topArtists_ } = $props();

  // console.log("topArtisitData", topArtists_);

  let topArtists: TopArtistsType[] = $state([]);

  $effect(() => {
    topArtists = topArtists_.items;
  });

  // State
  let page = $state(1);
  const size = 10;
  const slicedSource = $derived((s: TopArtistsType[]) =>
    s.slice((page - 1) * size, page * size)
  );

  const fields: string[] = ["Artists", "Followers", "Genres", "Actions", ""];

  const formatFollowerCount = (count: number) => {
    if (count < 1000) {
      return count.toString();
    } else if (count < 1000000) {
      return (Math.round(count / 100) / 10).toFixed(2) + "k";
    } else {
      return (Math.round(count / 100000) / 10).toFixed(2) + "M";
    }
  };
</script>

<div>
  <div class="table-wrap overflow-x-auto">
    <table class="table caption-bottom">
      <caption class="pt-4">Top Aritsts</caption>
      <TableHeadSnippet {fields} />
      <tbody class="[&>tr]:hover:bg-surface-500/80">
        {#each slicedSource(topArtists) as artists}
          <tr>
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
              <Modal cardType="artist" actionName="..." />
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
