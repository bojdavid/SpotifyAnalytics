<script lang="ts">
  import { onMount } from "svelte";

  onMount(async () => {
    //console.log(accessToken);
    getProfile();
  });

  async function getProfile() {
    let accessToken = localStorage.getItem("access_token");
    console.log(accessToken);

    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = await response.json();
    console.log(data);
  }
</script>

<div>
  <button> Request token </button>
</div>
