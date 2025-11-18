<script>
  import LightSwitch from "../LightSwitch.svelte";
</script>

<header
  class="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800"
>
  <div
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
  >
    <h1 class="text-xl sm:text-2xl font-bold">BOJ Spotify Analytics</h1>
    <LightSwitch />
  </div>
</header>
