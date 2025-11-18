<script lang="ts">
  import "../styles/app.css";
  import Main from "$lib/components/landing/Main.svelte";

  import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URI } from "$env/static/public";
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

<Main {authorize} />
