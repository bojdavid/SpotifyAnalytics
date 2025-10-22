<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  //items: string[] = [];          // e.g. ['track','album','playlist']
  // prefix: string = 'search by '; // fixed text before the typed word
  // typeDelay = 70;                // ms per typed character
  // eraseDelay = 40;               // ms per erased character
  // holdDelay = 1200;              // ms to hold full word before erasing
  // startDelay = 300;              // ms before first type
  // loop = true;

  let {
    items,
    prefix,
    typeDelay = 70,
    eraseDelay = 40,
    holdDelay = 1200,
    startDelay = 1300,
    loop = true,
  } = $props();

  let wordIndex = $state(0);
  let charIndex = $state(0);
  let current = $state("");
  let typing = $state(true); // true=typing, false=erasing
  let raf: number | null = $state(null);
  let timeout: ReturnType<typeof setTimeout> | null = $state(null);

  const clearTimers = () => {
    if (raf !== null) cancelAnimationFrame(raf);
    if (timeout) clearTimeout(timeout);
  };

  function step() {
    const word = items[wordIndex] ?? "";
    if (typing) {
      if (charIndex < word.length) {
        current = word.slice(0, ++charIndex);
        timeout = setTimeout(
          () => (raf = requestAnimationFrame(step)),
          typeDelay
        );
      } else {
        typing = false;
        timeout = setTimeout(
          () => (raf = requestAnimationFrame(step)),
          holdDelay
        );
      }
    } else {
      if (charIndex > 0) {
        current = word.slice(0, --charIndex);
        timeout = setTimeout(
          () => (raf = requestAnimationFrame(step)),
          eraseDelay
        );
      } else {
        typing = true;
        wordIndex = (wordIndex + 1) % items.length;
        if (!loop && wordIndex === 0) return; // stop after one cycle
        timeout = setTimeout(
          () => (raf = requestAnimationFrame(step)),
          startDelay
        );
      }
    }
  }

  onMount(() => {
    timeout = setTimeout(() => (raf = requestAnimationFrame(step)), startDelay);
  });

  onDestroy(clearTimers);
</script>

<span class="flex items-center gap-2">
  <span class="opacity-70 text-[10px] text-nowrap md:text-lg">{prefix}</span>
  <span class="relative text-[10px] md:text-lg">
    {current}
    <!-- caret -->
    <span
      class="ml-0.5 inline-block w-[1px] h-[1em] align-[-0.1em] bg-current animate-caret"
    ></span>
  </span>
</span>

<style>
  @keyframes caretBlink {
    0%,
    49% {
      opacity: 1;
    }
    50%,
    100% {
      opacity: 0;
    }
  }
  .animate-caret {
    animation: caretBlink 1s step-end infinite;
  }
</style>
