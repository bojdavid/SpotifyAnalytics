<script lang="ts">
  import LightSwitch from "../LightSwitch.svelte";
  import { Menu } from "@lucide/svelte";
  let { username, country, email, imageUrl, toggleSideBar, loading } = $props();
  import SearchModal from "./search/SearchModal.svelte";
</script>

<nav class="flex justify-between items-center px-4 sm:px-8 py-4 bg-surface-100-800-token/80 backdrop-blur-md border-b border-surface-200-700-token z-30 sticky top-0">
  <div class="flex items-center gap-4">
    <button class="md:hidden p-2 rounded-lg text-surface-500-400-token hover:bg-surface-200-700-token hover:text-surface-900-50-token transition-colors" onclick={toggleSideBar}>
      <Menu size={24} />
    </button>
    
    <div class="hidden sm:block">
      {#if loading}
        <div class="space-y-2">
          <div class="w-48 h-6 rounded-md bg-surface-300-600-token animate-pulse"></div>
          <div class="w-32 h-3 rounded-md bg-surface-300-600-token animate-pulse"></div>
        </div>
      {:else if username}
        <h2 class="h3 font-bold tracking-tight text-surface-900-50-token">
          Welcome back, {username}
        </h2>
        <p class="text-xs text-surface-500-400-token font-medium">
          {country} <span class="mx-1 opacity-50">•</span> {email}
        </p>
      {/if}
    </div>
  </div>

  <div class="flex items-center gap-4 sm:gap-6">
    <SearchModal />
    <div class="md:hidden">
      <!-- SearchModal might already have an icon, but we hide light switch on mobile since it's in the sidebar now -->
    </div>
  </div>
</nav>
