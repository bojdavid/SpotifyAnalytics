<script lang="ts">
  import "../../styles/app.css";
  import LightSwitch from "$lib/components/LightSwitch.svelte";

  import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URI } from "$env/static/public";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  // The code challenge and verifier are generated on the server (`+page.server.ts` or `+layout.server.ts`)
  // to initiate the PKCE (Proof Key for Code Exchange) authorization flow.
  const codeChallenge = data.codeChallenge;
  const codeVerifier: string = data.codeVerifier;
  const clientId = PUBLIC_CLIENT_ID;
  const redirectUri = PUBLIC_REDIRECT_URI;

  /**
   * Initiates the Spotify OAuth 2.0 PKCE flow.
   * Redirects the user to Spotify's authorization page.
   */
  const authorize = () => {
    // Define the scopes (permissions) our app needs from the user
    const scope =
      "user-read-private user-read-email user-top-read user-read-recently-played user-read-playback-position user-follow-read playlist-read-private playlist-read-collaborative";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    // Store the code verifier in localStorage. 
    // We will need it later when the user is redirected back to our app 
    // to exchange the authorization code for an access token.
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
    // Redirect user to Spotify login
    window.location.href = authUrl.toString();
  };
</script>

<main class="flex items-center justify-center min-h-screen bg-surface-50-950-token relative overflow-hidden p-4">
  <!-- Subtle Background Element -->
  <div class="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
    <div class="w-96 h-96 bg-[var(--color-spotify-green)] blur-[100px] rounded-full"></div>
  </div>

  <div class="card p-8 sm:p-10 max-w-md w-full shadow-xl z-10 border border-surface-200-700-token bg-surface-100-800-token/80 backdrop-blur-md">
    <div class="flex justify-end mb-6">
      <LightSwitch />
    </div>

    <div class="text-center space-y-6">
      <!-- Spotify-esque icon placeholder or simple logo design -->
      <div class="mx-auto w-16 h-16 bg-[var(--color-spotify-green)] rounded-full flex items-center justify-center shadow-lg shadow-[var(--color-spotify-green)]/30">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
      </div>

      <div class="space-y-2">
        <h1 class="h2 font-bold tracking-tight">
          Spotify Analytics
        </h1>
        <p class="text-surface-600-300-token text-sm">
          Connect your Spotify account to get an in-depth, beautiful analysis of your listening habits and top tracks.
        </p>
      </div>

      <button
        onclick={authorize}
        class="btn w-full font-bold text-white shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        style="background-color: var(--color-spotify-green);"
      >
        Login With Spotify
      </button>
      
      <p class="text-xs text-surface-500-400-token mt-4">
        We do not store your Spotify data on our servers.
      </p>
    </div>
  </div>
</main>
