<script lang="ts">
  import { Pagination } from "@skeletonlabs/skeleton-svelte";
  // Icons
  import IconArrowLeft from "@lucide/svelte/icons/arrow-left";
  import IconArrowRight from "@lucide/svelte/icons/arrow-right";
  import IconEllipsis from "@lucide/svelte/icons/ellipsis";
  import IconFirst from "@lucide/svelte/icons/chevrons-left";
  import IconLast from "@lucide/svelte/icons/chevron-right";

  let { data, size, page } = $props();
</script>

<footer class="flex justify-between">
  <select
    name="size"
    id="size"
    class="select max-w-[150px]"
    value={size}
    onchange={(e) => (size = Number(e.currentTarget.value))}
  >
    {#each [1, 2, 5, 10] as v}
      <option value={v}>Items {v} </option>
    {/each}
    <option value={data.length}>Show All</option>
  </select>
  <!-- Pagination -->
  <Pagination
    {data}
    {page}
    onPageChange={(e) => (page = e.page)}
    pageSize={size}
    onPageSizeChange={(e) => (size = e.pageSize)}
    siblingCount={4}
  >
    {#snippet labelEllipsis()}<IconEllipsis class="size-4" />{/snippet}
    {#snippet labelNext()}<IconArrowRight class="size-4" />{/snippet}
    {#snippet labelPrevious()}<IconArrowLeft class="size-4" />{/snippet}
    {#snippet labelFirst()}<IconFirst class="size-4" />{/snippet}
    {#snippet labelLast()}<IconLast class="size-4" />{/snippet}
  </Pagination>
</footer>
