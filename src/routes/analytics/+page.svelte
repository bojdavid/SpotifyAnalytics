<script lang="ts">
  import { onMount } from "svelte";

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

  let data: Promise<userdata> | undefined = $state();

  let topArtistsData: any = $state();
  let loading: boolean = $state(true);

  async function getProfile(accessToken: any) {
    //let accessToken = localStorage.getItem("access_token");
    //console.log(accessToken);
    if (accessToken != "undefined") {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

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

      return await response.json();
    } else {
      alert("Access token is undefined");
    }
  };

  onMount(async () => {
    console.log("-------------------- ------");
    try {
      loading = true;
      let accessToken: any = localStorage.getItem("access_token");
      data = await getProfile(accessToken);
      topArtistsData = await getTopArtists(accessToken);
    } catch (err) {
    } finally {
      loading = false;
      console.log($state.snapshot(topArtistsData));
    }
  });
</script>

<div>
  {#if loading}
    <div>Loading</div>
  {:else}
    <div class="flex-col">
      <div>
        {data.display_name}
      </div>
      <div>
        {data.country}
      </div>
      <div>
        {data.email}
      </div>
      <img
        src={data.images.url}
        alt=""
        height={data.images.height}
        width={data.images.width}
      />
    </div>
  {/if}
</div>
