<script lang="ts">
  let { children } = $props();
  import Sidebar from "$lib/components/analytics/AnalyticsSidebar.svelte";
  import { updateNetworkStatus } from "../../api/shared";
  import { onMount } from "svelte";
  import { getProfile } from "../../api/profile";
  import NavBar from "$lib/components/analytics/NavBar.svelte";
  import { userData, setUserData } from "$lib/global/userData.svelte";
  import { goto } from "$app/navigation";

  let openSideBar = $state(true);

  const toggleSideBar = () => {
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
      } catch (err: any) {
        const strError = JSON.parse(err.message);

        if (strError.status == 401) {
          alert(`user is unAuthorized : , ${strError.message}`);
          goto("/auth");
        }
        console.error("The error message", strError);
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
      <Sidebar
        closeSideBar={toggleSideBar}
        username={userData.display_name}
        imageUrl={userData.images[1]}
      />
    </aside>
  </div>
  <!-- End of side bar for small screens-->

  <!-- Side Bar-->
  <div class="hidden md:block">
    <aside class=" w-[260px] fixed inset-y-0 z-50">
      <Sidebar
        closeSideBar={toggleSideBar}
        username={userData.display_name}
        imageUrl={userData.images[1]}
      />
    </aside>
  </div>
  <!-- End Of Sidebar-->

  <div
    class="w-full min-h-screen z-10"
    style="background-image: url({userData.images[0].url}); 
          background-size: cover; 
          background-position: center;
          background-attachment: fixed;"
  >
    <main
      class="md:pl-[260px] w-auto z-10 bg-surface-50/50 dark:bg-surface-800/50 backdrop-blur-lg"
    >
      <NavBar
        username={userData.display_name}
        country={userData.country}
        email={userData.email}
        imageUrl={userData.images[1]}
        {toggleSideBar}
      />
      {#if !isOffline}
        {@render children?.()}
      {:else}
        <div class="text-red-500 text-4xl">No network, try again later</div>
      {/if}
    </main>
  </div>
</section>
