<script lang="ts">
  import { X, Search } from "@lucide/svelte";
  import { scale, fade } from "svelte/transition";
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
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeDialog = () => {
    // trigger outro of inner panel; dialog closes on outroend
    visible = false;
    document.body.style.overflow = "";
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
    class="flex gap-2 md:gap-4 items-center max-w-[320px] w-full border border-zinc-700/50 bg-zinc-800/40 hover:bg-zinc-800 hover:border-zinc-500 rounded-full px-4 md:px-5 py-2.5 transition-all duration-300 shadow-sm text-zinc-300 group"
  >
    <Search class="w-4 h-4 md:h-5 md:w-5 text-zinc-400 group-hover:text-spotify-green transition-colors" />
    <TypingAnimation
      items={["track", "albums", "playlist", "episode", "artist", "shows"]}
      prefix="Search By"
    />
  </button>

  <dialog
    bind:this={dialogRef}
    onclick={handleBackdropClick}
    class="mx-auto bg-transparent mt-10 md:mt-20 w-full max-w-4xl h-fit max-h-[85vh] overflow-visible p-0"
    onkeydown={(e) => e.key === "Escape" && closeDialog()}
  >
    {#if visible}
      <div
        class="bg-zinc-900/90 backdrop-blur-2xl border border-zinc-800/60 shadow-2xl rounded-2xl w-full h-full flex flex-col overflow-hidden relative"
        transition:scale={{ duration: 250, start: 0.95, opacity: 0 }}
        onoutroend={handleOutroEnd}
      >
        <button
          class="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-50"
          onclick={closeDialog}
        >
          <X size={20} />
        </button>
        <SearchComponent {closeDialog} />
      </div>
    {/if}
  </dialog>
</section>

<style>
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12px);
  }
</style>
