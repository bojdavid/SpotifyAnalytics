<script lang="ts">
  import { X } from "@lucide/svelte";
  import ArtistCard from "$lib/components/analytics/card/ArtistCard.svelte";
  import TrackCard from "$lib/components/analytics/card/TrackCard.svelte";

  import { scale, fly } from "svelte/transition";
  import { tick } from "svelte";

  interface Props {
    cardType: "artist" | "track" | "playlist";
    actionName?: string; //name to display as dialog opener
    cardData: any;
    openModal?: boolean;
    closeModalFromParent: () => void; //changes open modal to false
  }
  let {
    cardType,
    actionName,
    cardData,
    openModal,
    closeModalFromParent,
  }: Props = $props();

  let dialogRef: HTMLDialogElement;
  let visible = $state(false); // controls transition of inner panel
  let isMobile = $state(false);

  const openDialog = async () => {
    if (dialogRef?.open) return;
    isMobile = window.innerWidth < 640; // Determine screen size on open
    visible = true; // mount content so transitions can play
    await tick(); // wait for DOM
    dialogRef?.showModal();
  };

  $effect(() => {
    if (openModal) {
      openDialog();
    }
  });

  const closeDialog = () => {
    // trigger outro of inner panel; dialog closes on outroend
    visible = false;
    closeModalFromParent();
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

  // Custom responsive transition
  function responsiveTransition(node: Element, params?: any) {
    if (isMobile) {
      return fly(node, { y: 400, duration: 300 });
    } else {
      return scale(node, { duration: 300, start: 0.8 });
    }
  }
</script>

<section>
  {#if actionName}
    <button onclick={openDialog}> {actionName} </button>
  {/if}

  <dialog
    bind:this={dialogRef}
    onclick={handleBackdropClick}
    class="bg-transparent p-0 m-0 mt-auto w-full max-w-full sm:m-auto sm:w-auto sm:max-w-md overflow-hidden sm:rounded-2xl"
    onkeydown={(e) => e.key === "Escape" && dialogRef?.close()}
  >
    {#if visible}
      <div
        class="bg-zinc-900/90 dark:bg-spotify-black/90 backdrop-blur-xl w-full rounded-t-3xl sm:rounded-2xl shadow-2xl border-t border-zinc-700/50 sm:border relative max-h-[90vh] overflow-y-auto overflow-x-hidden"
        transition:responsiveTransition
        onoutroend={handleOutroEnd}
      >
        <!-- Mobile drag handle indicator -->
        <div class="w-full flex justify-center pt-3 pb-1 sm:hidden">
          <div class="w-12 h-1.5 bg-zinc-600 rounded-full"></div>
        </div>

        <button
          class="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors z-50 bg-black/20 rounded-full p-1"
          onclick={closeDialog}
        >
          <X size={24} />
        </button>

        <div class="p-2 sm:p-0">
          {#if cardType == "artist"}
            <ArtistCard artistData={cardData} />
          {:else if cardType == "track"}
            <TrackCard trackData={cardData} />
          {:else}
            <div class="p-8 text-center text-zinc-400 h-40 flex items-center justify-center">
              <h1>Card does not exist</h1>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </dialog>
</section>

<style>
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
  }
</style>
