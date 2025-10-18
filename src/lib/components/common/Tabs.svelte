<script lang="ts">
  let { tabData, activetab, setActiveTab } = $props();
  //const tabData = ["a", "b", "c"];
  //let activetab = $state(tabData[0]);
</script>

<div class="flex gap-3 justify-center">
  {#each tabData as data}
    <button
      onclick={() => {
        setActiveTab(data);
      }}
      class="text-lg px-3 py-1 {data == activetab
        ? 'text-spotify-green underline'
        : ''}"
    >
      {data}
    </button>
  {/each}
</div>
