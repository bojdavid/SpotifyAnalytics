
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import {CLIENT_ID, REDIRECT_URI} from '$env/static/private';

export const actions = {
	login_: async ({request}) => {
		console.log("ther server is workig --------------------")
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope:scope,
      redirect_uri: REDIRECT_URI,
      state: state
    });

    console.log(params.toString)
    throw redirect(302, `https://accounts.spotify.com/authorize?${params.toString()}`);
	}
} satisfies Actions;