<script lang="ts">
  let { children } = $props();
  import Sidebar from "$lib/components/analytics/AnalyticsSidebar.svelte";
  import { updateNetworkStatus } from "../../api/shared";
  import { onMount } from "svelte";
  import { getProfile } from "../../api/profile";
  import NavBar from "$lib/components/analytics/NavBar.svelte";
  import { userData, setUserData } from "$lib/global/userData.svelte";
  import { goto } from "$app/navigation";
  import "../../styles/app.css";

  let openSideBar = $state(false);

  const toggleSideBar = () => {
    openSideBar = !openSideBar;
  };

  let isOffline: boolean = $state(false);
  let userProfile: any = $state([]);
  let loading: boolean = $state(true);

  onMount(async () => {
    isOffline = updateNetworkStatus();
    let accessToken: any = localStorage.getItem("access_token");
    if (!isOffline) {
      loading = true;
      try {
        let res = await getProfile(accessToken);
        userProfile = res;
        setUserData(userProfile);
      } catch (err: any) {
        if (err.message) {
          try {
             const strError = JSON.parse(err.message);
             if (strError.status == 401) {
               goto("/auth");
               return;
             }
          } catch(e) {}
        }
        console.error("Error fetching profile:", err);
      } finally {
        loading = false;
      }
    }
  });
</script>

<div class="flex h-screen w-full bg-surface-50-950-token overflow-hidden relative">
  <!-- Mobile Sidebar Overlay -->
  {#if openSideBar}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="fixed inset-0 bg-surface-900/50 backdrop-blur-sm z-40 md:hidden"
      onclick={toggleSideBar}
    ></div>
  {/if}

  <!-- Sidebar (Mobile & Desktop) -->
  <aside
    class="fixed inset-y-0 left-0 z-50 w-[260px] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 {openSideBar ? 'translate-x-0' : '-translate-x-full'}"
  >
    <Sidebar
      closeSideBar={toggleSideBar}
      username={userData?.display_name}
      imageUrl={userData?.images?.[1]}
      {loading}
    />
  </aside>

  <!-- Main Content Area -->
  <main class="flex-1 flex flex-col h-screen overflow-hidden bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-900 dark:to-surface-800">
    <NavBar
      username={userData?.display_name}
      country={userData?.country}
      email={userData?.email}
      imageUrl={userData?.images?.[1]}
      {toggleSideBar}
      {loading}
    />
    
    <div class="flex-1 overflow-y-auto relative">
      {#if !isOffline}
        {@render children?.()}
      {:else}
        <div class="flex h-full w-full items-center justify-center">
          <div class="text-center space-y-4">
            <h2 class="text-error-500-400-token h2 font-bold">You are offline</h2>
            <p class="text-surface-500-400-token">Please check your internet connection and try again.</p>
          </div>
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
</style>
