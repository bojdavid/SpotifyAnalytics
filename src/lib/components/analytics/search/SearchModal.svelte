<script lang="ts">
  import { X, Search } from "@lucide/svelte";
  import { scale } from "svelte/transition";
  import { tick } from "svelte";
  import SearchComponent from "./SearchComponent.svelte";
  import TypingAnimation from "$lib/components/common/TypingAnimation.svelte";

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
  <button
    onclick={openDialog}
    class="flex gap-5 items-center max-w-full w-[150px] md:w-[300px] border-1 border-surface-200 rounded-lg px-3 py-1"
  >
    <Search size={20} />
    <TypingAnimation
      items={["track", "albums", "playlist", "episode", "artist", "shows"]}
      prefix="Search By"
    />
  </button>

  <dialog
    bind:this={dialogRef}
    onclick={handleBackdropClick}
    class=" mx-auto bg-transparent mt-5 h-screen"
    onkeydown={(e) => e.key === "Escape" && dialogRef?.close()}
  >
    {#if visible}
      <div
        class="bg-white/80 dark:bg-spotify-black/50 backdrop-blur rounded-lg"
        transition:scale={{ duration: 300, start: 0.8 }}
        onoutroend={handleOutroEnd}
      >
        <!--
        <button
          class="float-right text-red-500 float-right float-top"
          onclick={closeDialog}
        >
          <X size={40} />
        </button>
      -->
        <SearchComponent />
      </div>
    {/if}
  </dialog>
</section>

<style>
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.4);
  }
</style>
