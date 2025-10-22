<script>
  let { fields } = $props();
  import { hideOnMobile } from "$lib/utils/table";
</script>

<thead class="bg-surface-100/50 dark:bg-surface-800/50 backdrop-blur">
  <tr>
    {#each fields as field}
      <th
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
        {field.hideOnMobile ? hideOnMobile : ''}"
      >
        {field.field}
      </th>
    {/each}
  </tr>
</thead>
