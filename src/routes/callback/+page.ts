import type { PageLoad } from './$types';
import {
    PUBLIC_ACCESS_TOKEN,
    PUBLIC_CLIENT_ID,
    PUBLIC_REDIRECT_URI,
  } from "$env/static/public";

  const clientId = PUBLIC_CLIENT_ID;
  const redirectUri = PUBLIC_REDIRECT_URI;
  let accessToken 

export const ssr = false; // 👈 disables server-side rendering

export const load: PageLoad = async ({ params }) => {

  const getToken = async (code: any): Promise<any> => {
    const codeVerifier = localStorage.getItem("code_verifier");

    if (!codeVerifier) {
      throw new Error("Code verifier not found in localStorage.");
    }

    const url = "https://accounts.spotify.com/api/token";

    const payload: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId, // make sure clientId is typed and declared
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri, // make sure redirectUri is typed and declared
        code_verifier: codeVerifier,
      }),
    };

    const response = await fetch(url, payload);
    const data: {
      access_token: string;
      token_type: string;
      scope: string;
      expires_in: number;
      refresh_token?: string;
    } = await response.json();

    localStorage.setItem("access_token", data.access_token);
    console.log(data);
    accessToken = data.access_token;
  };

  const urlParams = new URLSearchParams(window.location.search);
    let code: any = urlParams.get("code");

getToken(code);
}