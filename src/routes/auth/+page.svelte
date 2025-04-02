<script lang="ts">
  import "../../styles/app.css";
  import {
    PUBLIC_ACCESS_TOKEN,
    PUBLIC_CLIENT_ID,
    PUBLIC_REDIRECT_URI,
  } from "$env/static/public";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  console.log(data);
  const codeChallenge = data.codeChallenge;
  const codeVerifier: string = data.codeVerifier;
  const clientId = PUBLIC_CLIENT_ID;
  const redirectUri = PUBLIC_REDIRECT_URI;

  const authorize = () => {
    const scope = "user-read-private user-read-email";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    // generated in the previous step
    window.localStorage.setItem("code_verifier", codeVerifier);

    const params = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  onMount(() => {});

  //const accessToken: string = PUBLIC_ACCESS_TOKEN;
  let accessToken: string = $state("");

  const login = async (): Promise<void> => {
    let response = await fetch("/api/auth");
    //console.log(await response.json());
    let data = await response.json();
    accessToken = await data.access_token;
    localStorage.setItem("token", data);
    alert("done");
  };

  async function getProfile() {
    console.log(accessToken);
    const response = await fetch(
      "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    console.log(data);
  }
</script>

<h1>This the authentication page</h1>
<button class="bg-red-500" onclick={login}> click here to login </button>
<button class="bg-red-500" onclick={getProfile}>
  click here to get profile
</button>

<button onclick={authorize} class="p-3 text-lg bg-gray-500">Authorize</button>
