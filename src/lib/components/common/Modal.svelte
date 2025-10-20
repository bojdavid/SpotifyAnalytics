<script lang="ts">
  import { X } from "@lucide/svelte";
  import ArtistCard from "$lib/components/analytics/card/ArtistCard.svelte";
  import TrackCard from "$lib/components/analytics/card/TrackCard.svelte";

  import { scale } from "svelte/transition";
  import { tick } from "svelte";

  let { cardType, actionName, cardData } = $props();

  let dialogRef: HTMLDialogElement;
  let visible = $state(false); // controls transition of inner panel

  const openDialog = async () => {
    if (dialogRef?.open) return;
    visible = true; // mount content so transitions can play
    await tick(); // wait for DOM
    dialogRef?.showModal();
  };

  const closeDialog = () => {
    // trigger outro of inner panel; dialog closes on outroend
    visible = false;
  };

  const handleBackdropClick = (event: MouseEvent) => {
    // If the user clicked directly on the backdrop (the <dialog> itself)
    if (event.target === dialogRef) {
      closeDialog();
    }
  };

  const handleOutroEnd = () => {
    // only close after the scale/fade outro finishes
    dialogRef?.close();
  };
</script>

<section>
  <button onclick={openDialog}> {actionName} </button>

  <dialog
    bind:this={dialogRef}
    onclick={handleBackdropClick}
    class=" m-auto bg-transparent"
    onkeydown={(e) => e.key === "Escape" && dialogRef?.close()}
  >
    {#if visible}
      <div
        class="bg-white/30 dark:bg-spotify-black/50 backdrop-blur w-full rounded-lg"
        transition:scale={{ duration: 300, start: 0.8 }}
        onoutroend={handleOutroEnd}
      >
        <button
          class="float-right text-red-500 float-right float-top"
          onclick={closeDialog}
        >
          <X size={40} />
        </button>
        {#if cardType == "artist"}
          <ArtistCard artistData={cardData} />
        {:else if cardType == "track"}
          <TrackCard trackData={cardData} />
        {:else}
          <h1 class="text-center">Card does not exist</h1>
        {/if}
      </div>
    {/if}
  </dialog>
</section>

<style>
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.4);
  }
</style>
