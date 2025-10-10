<script lang="ts">
  let { closeSideBar, username, imageUrl } = $props();
  import { X } from "@lucide/svelte";
  import { page } from "$app/state";
  import LightSwitch from "../LightSwitch.svelte";

  interface sideBarRoutes {
    name: string;
    route: string;
  }
  let routes: sideBarRoutes[] = [
    { name: "Home", route: "/analytics" },
    { name: "Top Data", route: "/analytics/top" },
    { name: "Playlists", route: "/analytics/playlists" },
    { name: "Audio Analysis", route: "/analytics/audio-analysis" },
  ];
</script>

<div class="flex w-full gap-0">
  <section
    class=" h-screen max-h-[1000px] w-[8/10] flex-grow md:w-[260px] bg-spotify-green pr-5 relative shadow-lg p-3"
  >
    <button class="absolute right-2 md:hidden" onclick={closeSideBar}>
      <X size={40} />
    </button>
    <div class="text-2xl py-10 h-full flex flex-col justify-between">
      <header class="flex">
        <h2 class="text-3xl">
          {username}
        </h2>
        <img
          src={imageUrl.url}
          alt="profile piture of {username}"
          class="rounded-full"
        />
        <LightSwitch />
      </header>
      <main class="flex flex-col gap-5 pt-20 flex-grow">
        {#each routes as route}
          <a
            onclick={closeSideBar}
            href={route.route}
            class=" px-2 py-1 hover:bg-spotify-black/50 transition duration-400 ease-in-out rounded-lg {page
              .url.pathname == route.route
              ? 'bg-spotify-black/20  '
              : ''}">{route.name}</a
          >
        {/each}
      </main>
      <footer class="mt-auto mb-6 flex flex-col">
        <a href="/analytics/settings" class="">Settings</a>
        <a href="./" class="text-red-500">Logout</a>
      </footer>
    </div>
  </section>
  <!-- Overlay-->
  <div
    class=" bg-surface-900/70 backdrop-blur-sm md:hidden w-1/5"
    onclick={closeSideBar}
  ></div>
</div>
