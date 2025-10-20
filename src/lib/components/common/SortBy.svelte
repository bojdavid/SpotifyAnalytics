<script lang="ts">
  let { onFilterChange, filter, activeFilter, isAscending, toggleAscDesc } =
    $props();
  import { ArrowDownNarrowWide } from "@lucide/svelte";
</script>

<div class="my-5 flex gap-1 items-center">
  <label for="filter">Sort by:</label>
  <select
    id="filter"
    onchange={onFilterChange}
    bind:value={activeFilter.name}
    class="outline-none focus:border-spotify-green/50 border-1 dark:border-gray-700 border-gray-400 rounded-sm text-center"
  >
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
    <ArrowDownNarrowWide size={20} />
  </button>
</div>
