<!-- src/lib/ThemeToggle.svelte -->
<script>
  import { onMount } from "svelte";
  import { Sun, Moon } from "@lucide/svelte";

  let isDarkMode = $state(false);

  //let { size } = $props();
  const size = 30;

  onMount(() => {
    // Check for user's preference in localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      isDarkMode = savedTheme === "dark";
    } else {
      isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    updateTheme();
  });

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    updateTheme();
  }

  function updateTheme() {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
</script>

<button onclick={toggleTheme}>
  {#if isDarkMode}
    <Sun {size} />
  {:else}
    <Moon {size} />
  {/if}
</button>
