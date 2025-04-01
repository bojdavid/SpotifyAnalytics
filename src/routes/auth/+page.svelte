<script lang="ts">
  import "../../styles/app.css";

  const generateRandomString = (length: number) => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  const codeVerifier = generateRandomString(64);

  const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  };

  const base64encode = (input: any) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  let codeChallenge = $state();
  const cod = async () => {
    const hashed = await sha256(codeVerifier);
    codeChallenge = base64encode(hashed);
  };

  cod();

  const login = async (): Promise<void> => {
    const clientId = "1ab88bb408eb4b849650f0119d8bd38f";
    const redirectUri = "http://localhost:5173/auth";

    const scope = "user-read-private user-read-email";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    // generated in the previous step
    window.localStorage.setItem("code_verifier", codeVerifier);

    const params: any = {
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

<h1>This the authentication page</h1>
<button class="bg-red-500" onclick={login}> click here to login </button>
