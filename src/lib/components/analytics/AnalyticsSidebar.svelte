<script lang="ts">
  let { closeSideBar, username, imageUrl, loading } = $props();
  import { X, Home, BarChart2, ListMusic, Settings, LogOut } from "@lucide/svelte";
  import { page } from "$app/state";
  import LightSwitch from "../LightSwitch.svelte";

  interface sideBarRoutes {
    name: string;
    route: string;
    icon: any;
  }
  let routes: sideBarRoutes[] = [
    { name: "Dashboard", route: "/analytics", icon: Home },
    { name: "Top Data", route: "/analytics/top", icon: BarChart2 },
    { name: "Playlists", route: "/analytics/playlists", icon: ListMusic },
  ];
</script>

<div class="flex h-full w-full">
  <section
    class="h-full w-full flex flex-col bg-surface-100-800-token border-r border-surface-200-700-token shadow-xl relative"
  >
    <button class="absolute top-4 right-4 md:hidden text-surface-500-400-token hover:text-surface-900-50-token" onclick={closeSideBar}>
      <X size={28} />
    </button>
    
    <div class="px-6 py-8 flex flex-col h-full">
      <header class="flex flex-col gap-6 mb-8">
        <div class="flex items-center justify-between">
          <!-- Logo area -->
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-[var(--color-spotify-green)] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
            </div>
            <span class="font-bold text-lg tracking-tight hidden md:block">Analytics</span>
          </div>
          <div class="hidden md:block">
             <LightSwitch />
          </div>
        </div>

        {#if loading}
          <div class="flex items-center gap-4 animate-pulse">
            <div class="w-12 h-12 rounded-full bg-surface-300-600-token"></div>
            <div class="w-24 h-4 rounded bg-surface-300-600-token"></div>
          </div>
        {:else if username}
          <div class="flex items-center gap-4 p-3 rounded-lg bg-surface-200-700-token/50">
            <img
              src={imageUrl?.url || "https://ui-avatars.com/api/?name=" + username}
              alt="Profile of {username}"
              class="w-12 h-12 rounded-full shadow-md object-cover border-2 border-surface-300-600-token"
            />
            <div class="flex flex-col overflow-hidden">
              <span class="text-xs text-surface-500-400-token font-semibold uppercase tracking-wider">Welcome</span>
              <span class="font-bold text-surface-900-50-token truncate">{username}</span>
            </div>
          </div>
        {/if}
      </header>

      <main class="flex flex-col gap-2 flex-grow">
        <span class="text-xs font-bold text-surface-400-500-token uppercase tracking-wider mb-2 px-3">Menu</span>
        {#each routes as route}
          <a
            onclick={closeSideBar}
            href={route.route}
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium
              {page.url.pathname === route.route
              ? 'bg-[var(--color-spotify-green)]/10 text-[var(--color-spotify-green)] shadow-sm'
              : 'text-surface-600-300-token hover:bg-surface-200-700-token hover:text-surface-900-50-token'}"
          >
            <route.icon size={20} class={page.url.pathname === route.route ? 'text-[var(--color-spotify-green)]' : 'text-surface-500-400-token'} />
            {route.name}
          </a>
        {/each}
      </main>

      <footer class="mt-auto pt-6 border-t border-surface-200-700-token flex flex-col gap-2">
        <a
          href="/analytics/settings"
          onclick={closeSideBar}
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-surface-600-300-token hover:bg-surface-200-700-token hover:text-surface-900-50-token"
        >
          <Settings size={20} class="text-surface-500-400-token" />
          Settings
        </a>
        <a
          href="/"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-error-500-400-token hover:bg-error-500/10"
          onclick={() => {
            sessionStorage.clear();
            localStorage.removeItem("access_token");
            closeSideBar();
          }}
        >
          <LogOut size={20} />
          Logout
        </a>
      </footer>
    </div>
  </section>
</div>
