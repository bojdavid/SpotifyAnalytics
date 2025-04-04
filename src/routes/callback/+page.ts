import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import {
    PUBLIC_CLIENT_ID,
    PUBLIC_REDIRECT_URI,
  } from "$env/static/public";

  const clientId = PUBLIC_CLIENT_ID;
  const redirectUri = PUBLIC_REDIRECT_URI;


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

    try{

        const response = await fetch(url, payload);
        if(response.ok){
            const data: {
              access_token: string;
              token_type: string;
              scope: string;
              expires_in: number;
              refresh_token?: string;
            } = await response.json();
        
            localStorage.setItem("access_token", data.access_token);
            //throw redirect(307,"/analytics")
            window.location.href = '/analytics'
        }
        else{
            alert("An error occured")
            throw new Error("Failed to get token");
        }
    }catch (err){
        // Case 1: Handle SvelteKit redirects
        if (err instanceof redirect) {
            throw err; // Re-throw redirect to let SvelteKit handle it
        }
        
        console.error(err);

        return;
    }
    finally{
        console.log("The get token function worked")
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
    let code: any = urlParams.get("code");

getToken(code);
}