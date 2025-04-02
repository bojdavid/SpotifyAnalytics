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
    const scope =
      "user-read-private user-read-email user-top-read user-read-recently-played user-read-playback-position user-follow-read playlist-read-private playlist-read-collaborative";
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
</script>

<h1>This the authentication page</h1>

<button onclick={authorize} class="p-3 text-lg bg-gray-500"
  >Login With Spotify
</button>
