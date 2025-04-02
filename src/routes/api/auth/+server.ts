import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {CLIENT_ID, REDIRECT_URI, CLIENT_SECRET} from '$env/static/private';
import { json } from '@sveltejs/kit';



/*
function generateRandomString(length: number) {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let text = '';
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}


export const GET: RequestHandler = ({ url }) => {
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

*/
let client_id :string = CLIENT_ID
let redirect_uri :string = REDIRECT_URI
let client_secret :string = CLIENT_SECRET

export const GET: RequestHandler = async ({ url }) => {
	const authString = btoa(`${client_id}:${client_secret}`);
	let response : any;
	let data : any;
	try{
		response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Authorization': `Basic ${authString}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'client_credentials'
		})
		});
	
		data = await response.json();
		
	}
	catch (error){
		console.error('Failed to fetch token:', response.status, await response.text());
		console.error("There was an error : ", error)
	}
	finally{
		const token = data.access_token;
		console.log('Access Token:', token);
		console.log(data)
		return json(data);
		
	}

	
}