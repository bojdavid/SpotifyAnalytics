<script lang="ts">
  import { error } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import ProfileData from "$lib/components/analytics/ProfileData.svelte";
  import TopData from "$lib/components/analytics/TopData.svelte";

  import "../../styles/app.css";
  import LightSwitch from "$lib/components/LightSwitch.svelte";

  interface userdata {
    country: "string";
    display_name: "string";
    email: "string";
    explicit_content: {
      filter_enabled: false;
      filter_locked: false;
    };
    external_urls: {
      spotify: "string";
    };
    followers: {
      href: "string";
      total: 0;
    };
    href: "string";
    id: "string";
    images: [
      {
        url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228";
        height: 300;
        width: 300;
      },
    ];
    product: "string";
    type: "string";
    uri: "string";
  }

  let data: any = $state();

  let topArtistsData: any = $state();
  let loading: boolean = $state(false);

  async function getProfile(accessToken: any) {
    if (accessToken != "undefined") {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (!response.ok) {
        const errorText = await response.json(); // or res.text() if error is text
        throw new Error(`Profile Error [${response.status}]: ${errorText}`);
      }
      return await response.json();
    } else {
      alert("Access token is undefined");
    }
  }

  const getTopArtists = async (accessToken: any) => {
    if (accessToken != "undefined") {
      const response = await fetch(
        "https://api.spotify.com/v1/me/top/artists",
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      if (!response.ok) {
        const errorText = await response.json(); // or res.text() if error is a text
        throw new Error(`Profile Error [${response.status}]: ${errorText}`);
      }
      return await response.json();
    } else {
      alert("Access token is undefined hopefully");
    }
  };
  /*
  onMount(async () => {
    console.log("-------------------- ------");
    try {
      loading = true;
      let accessToken: any = localStorage.getItem("access_token");

      [data, topArtistsData] = await Promise.all([
        getProfile(accessToken),
        getTopArtists(accessToken),
      ]);
    } catch (err) {
      loading = false;

      const errorMsg = err instanceof Error ? err.message : String(err);
      alert(`Error: ${errorMsg}`);
      console.error("The error message:", errorMsg);
      //Redirect back to the auth page if accessToken has expired.
    } finally {
      loading = false;
    }
  });
*/

  const filters: string[] = [
    "Top Artists",
    "Following",
    "Playlists",
    "Random Song",
    "sdsd",
    "wewe",
    "wewe",
  ];

  //Sample range for table data
  const range = Array.from({ length: 5 }, (_, i) => i + 1);
</script>

<main class="mx-4">
  <div>
    {#if loading}
      <div>Loading</div>
    {:else}
      <div class="flex-col gap-4">
        <div
          class="flex justify-between flex-wrap max-w-[1700px] min-w-[200px] w-full pr-10 bg-surface-100 dark:bg-surface-900 mx-auto pl-5 mt-5"
        >
          <div class="max-w-[800px] w-full py-3 flex flex-wrap justify-between">
            <ProfileData user={data} />
            <label class="label w-[250px]">
              <span class="label-text text-lg">Category To View</span>
              <select class="select">
                {#each filters as filter, i}
                  <option value={i}> {filter}</option>
                {/each}
              </select>
            </label>
          </div>
          <div class=" p-5">
            <LightSwitch />
          </div>
        </div>
      </div>
      <!-- TOP ARTISTS-->
      <div class="mt-10">
        <TopData />
      </div>
    {/if}
  </div>
</main>
