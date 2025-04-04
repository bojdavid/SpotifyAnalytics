<script lang="ts">
  import "../../styles/app.css";
  import LightSwitch from "$lib/components/LightSwitch.svelte";

  // Icons
  import IconMoon from "@lucide/svelte/icons/moon";
  import IconSun from "@lucide/svelte/icons/sun";

  import {
    PUBLIC_ACCESS_TOKEN,
    PUBLIC_CLIENT_ID,
    PUBLIC_REDIRECT_URI,
  } from "$env/static/public";
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
</script>

<main class="flex items-center justify-center m-auto w-full h-screen">
  <div
    class=" p-5 mx-2 shadow-md shadow-secondary-900 dark:shadow-secondary-200"
  >
    <div class="text-center flex justify-center">
      <LightSwitch />
    </div>
    <h1 class=" text-2xl sm:text-3xl font-bold mx-auto text-center mt-5">
      BOJ Spotify Analytics
    </h1>

    <h4 class="text-xs font-thin mx-auto text-center mb-6">
      Connect Your Spotify And Get An Indepth Analytics Of Your Data
    </h4>

    <button
      onclick={authorize}
      class="p-3 text-md dark:bg-secondary-900 bg-secondary-900
            mx-auto flex items-center my-5 rounded-lg
            text-surface-50 font-bold
            hover:bg-transparent hover:border-2 hover:border-secondary-700 hover:text-surface-900 dark:hover:text-surface-100
            transition duration-300 ease-in-out
            "
      >Login With Spotify
    </button>
  </div>
</main>
