
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


var redirect_url : string = "http://localhost:5173/auth";
let client_id : string = "1ab88bb408eb4b849650f0119d8bd38f"


export const GET = async ({ url })  => {
	console.log("ther server is workig --------------------")
	// The code for requesting user authorization looks as follows:
		const clientId = client_id
		const redirectUri = redirect_url

		const scope = 'user-read-private user-read-email';
		const authUrl = new URL("https://accounts.spotify.com/authorize")

		// generated in the previous step
		//window.localStorage.setItem('code_verifier', codeVerifier);

		const params =  {
		response_type: 'code',
		client_id: clientId,
		scope,
		code_challenge_method: 'S256',
		code_challenge: codeChallenge,
		redirect_uri: redirectUri,
		}

		authUrl.search = new URLSearchParams(params).toString();
		// Return the authorization URL to the client
		return new Response(JSON.stringify({ authUrl: authUrl.toString() }), {
			headers: { 'Content-Type': 'application/json' },
		  });
}






const generateRandomString = (length:number) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }
  
const codeVerifier  = generateRandomString(64);

  console.log(codeVerifier)

const sha256 = async (plain :string) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }
  
const base64encode = (input : any) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

const hashed = await sha256(codeVerifier)
const codeChallenge = base64encode(hashed);
  

