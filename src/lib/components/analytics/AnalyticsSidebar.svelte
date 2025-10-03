<script lang="ts">
  let { closeSideBar } = $props();
  import { X } from "@lucide/svelte";
  import { page } from "$app/state";

  interface sideBarRoutes {
    name: string;
    route: string;
  }
  let routes: sideBarRoutes[] = [
    { name: "Top Data", route: "/analytics" },
    { name: "Playlists", route: "/analytics/playlists" },
    { name: "dunno yet", route: "/analytics" },
  ];
</script>

<div class="flex w-full gap-0">
  <section
    class=" xl:min-h-[832px] h-screen max-h-[1000px] w-[260px] bg-secondary-200 dark:bg-secondary-950 pr-5 relative shadow-lg p-3"
  >
    <button class="absolute right-2 md:hidden" onclick={closeSideBar}>
      <X size={40} />
    </button>
    <div class="text-2xl py-10 h-full flex flex-col justify-between">
      <header>header</header>
      <main class="flex flex-col gap-5 pt-20 flex-grow">
        {#each routes as route}
          <a
            href={route.route}
            class=" px-2 py-1 {page.url.pathname == route.route
              ? 'bg-light-primary-accent rounded-lg '
              : ''}">{route.name}</a
          >
        {/each}
      </main>
      <footer class="mt-auto mb-6">
        <a href="./" class="text-error">Logout</a>
      </footer>
    </div>
  </section>
  <!-- Overlay-->
  <div class=" bg-dark-bg/30 w-full md:hidden" onclick={closeSideBar}></div>
</div>
