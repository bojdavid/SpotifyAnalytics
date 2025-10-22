<script>
  import { onMount } from "svelte";
  import LoaderM from "$lib/components/common/LoaderM.svelte";
  import "../../styles/app.css";

  let loading = $state(true);

  onMount(() => {
    loading = true;
  });
  console.log("Redirecting you to dashboard");
</script>

{#if loading}
  <div
    class="h-screen w-full flex justify-center items-center bg-spotify-black"
  >
    <LoaderM />
  </div>
{/if}
