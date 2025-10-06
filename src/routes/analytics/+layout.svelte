<script lang="ts">
  let { children } = $props();
  import Sidebar from "$lib/components/analytics/AnalyticsSidebar.svelte";
  import { updateNetworkStatus } from "../../api/shared";
  import { onMount } from "svelte";
  import { getProfile } from "../../api/profile";
  import NavBar from "$lib/components/analytics/NavBar.svelte";
  import { userData, setUserData } from "$lib/global/userData.svelte";

  let openSideBar = $state(true);

  const closeSideBar = () => {
    openSideBar = !openSideBar;
    console.log(openSideBar);
  };

  let isOffline: boolean = $state(false);
  let userProfile: any = $state([]);

  onMount(async () => {
    isOffline = updateNetworkStatus();
    console.log("offline status --------", isOffline);
    let accessToken: any = localStorage.getItem("access_token");
    if (!isOffline) {
      try {
        let res = await getProfile(accessToken);
        userProfile = res;
      } catch (err) {
        console.error("The error message", err);
      } finally {
        setUserData(userProfile);
        //console.log("user data after set data------ ", userData);
      }
    }
  });
</script>

<section
  class="max-w-[2000px] mx-auto overflow-x-hidden overflow-y-display flex relative w-full"
>
  <!-- Side Bar -->
  <div class="md:hidden">
    <aside
      class="w-full ease-in-out transform transition-all duration-500 {openSideBar
        ? ' -translate-x-full opacity-0  '
        : ' translate-x-0 opacity-100 fixed'} absolute overflow-y-auto z-50"
    >
      <Sidebar {closeSideBar} />
    </aside>

    <button class="" onclick={closeSideBar}>Open</button>
  </div>
  <!-- End of side bar for small screens-->

  <!-- Side Bar-->
  <div class="hidden md:block">
    <aside class=" w-[260px]">
      <div class=" w-full fixed inset-y-0 left-0">
        <Sidebar {closeSideBar} />
      </div>
    </aside>
  </div>
  <!-- End Of Sidebar-->

  <main class="w-full z-10 pt-40">
    <NavBar
      username={userData.display_name}
      country={userData.country}
      email={userData.email}
      imageUrl={userData.images[1]}
    />
    {#if !isOffline}
      {@render children?.()}
    {:else}
      <div class="text-red-500 text-4xl">No network, try again later</div>
    {/if}
  </main>
</section>
