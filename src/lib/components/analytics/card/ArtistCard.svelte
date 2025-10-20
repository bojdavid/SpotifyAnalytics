<script lang="ts">
  import { X, UserPlus, UserMinus, Loader } from "@lucide/svelte";
  import { formatFollowerCount } from "$lib/global/functions";
  import { onMount } from "svelte";
  import {
    getArtistTopTracks,
    checkIfUserFollowsArtistOrUser,
  } from "../../../../api/artists";
  import { goto } from "$app/navigation";
  import { tick } from "svelte";

  let { artistData } = $props();

  let artistTopTracks: any = $state([]);
  let userFollowsArtist: boolean = $state(false);
  let loading: boolean = $state(true);
  let visible: boolean = $state(false);
  let follow_unFollow_Artist_Pending: boolean = $state(false);

  onMount(async () => {
    try {
      loading = true;
      let accessToken: any = localStorage.getItem("access_token");

      [artistTopTracks, userFollowsArtist] = await Promise.all([
        getArtistTopTracks(accessToken, artistData.id),
        checkIfUserFollowsArtistOrUser(accessToken, artistData.id),
      ]);
    } catch (err: any) {
      loading = false;
      err = JSON.parse(err.message);
      //Redirect back to the auth page if accessToken has expired.
      if (err.status == 401) {
        goto("/auth");
        return;
      }

      alert(`Error: ${err.message}`);
      console.error("The error message:", err.message);
    } finally {
      await tick();
      loading = false;
      visible = true;
      //console.log(" artist track data --------", artistTopTracks);
    }
  });

  const follow_artist = () => {
    follow_unFollow_Artist_Pending = true;
    setTimeout(() => {
      follow_unFollow_Artist_Pending = false;
    }, 2000);
  };
  const unfollow_artist = () => {
    follow_unFollow_Artist_Pending = true;
    setTimeout(() => {
      follow_unFollow_Artist_Pending = false;
    }, 2000);
  };
</script>

<article class=" w-[600px] max-w-full px-5 mx-auto">
  <header class="flex gap-5 justify-between pt-5">
    <div>
      <h2>{artistData.name}</h2>
      <p class="text-xs">
        <span class="font-light text-surface-400">Followers : </span>
        {formatFollowerCount(artistData.followers.total)}
      </p>
      <div class="flex items-center gap-2">
        {#if loading}
          <div class="w-25 h-4 bg-spotify-green/50 animate-pulse"></div>
        {:else if userFollowsArtist}
          <button
            class="text-spotify-green rounded-lg text-sm font-bold flex gap-1
                  disabled:cursor-not-allowed disabled:text-spotify-green/50
            "
            disabled={follow_unFollow_Artist_Pending}
            onclick={unfollow_artist}
          >
            <span>
              <UserMinus size={20} />
            </span>
            Unfollow Artist
          </button>
        {:else}
          <button
            class="text-spotify-green rounded-lg text-sm font-bold flex gap-1
                  disabled:cursor-not-allowed disabled:text-spotify-green/50
            "
            disabled={follow_unFollow_Artist_Pending}
            onclick={follow_artist}
          >
            <span class="text-xs">
              <UserPlus size={20} />
            </span>
            Follow Artist
          </button>
        {/if}
        <!-- Load indicator for when user clicks the follow button -->
        {#if follow_unFollow_Artist_Pending}
          <Loader size={10} class="animate-spin inline-flex" />
        {/if}
      </div>
    </div>
  </header>

  <!-- Image container -->
  <div
    class="border-2 border-spotify-green rounded-full w-40 h-40 md:w-60 md:h-60 mx-auto shadow-lg shadow-spotify-green hover:shadow-xl transition duration-300 ease-in-out overflow-hidden"
  >
    <img
      src={artistData.images[1].url}
      alt={artistData.name}
      class="w-full h-full cover"
    />
  </div>
  <p class="text-center mt-5">popularity: {artistData.popularity}</p>

  <!-- Genre Container -->
  <div>
    <h4>Genres</h4>
    <div class="flex gap-2 flex-wrap">
      {#each artistData.genres as genre}
        <div
          class="border-1 border-spotify-green rounded-sm px-3 text-xs sm:text-sm md:text-md"
        >
          {genre}
        </div>
      {/each}
    </div>
  </div>

  <!-- Top 10 tracks-->
  <div class="mt-5">
    <h4>{artistData.name} top 10 tracks</h4>
    <p class="text-xs text-surface-500">Click On A Track To View It</p>

    {#if loading}
      <!-- Place holder for top 10 artist when loading-->
      {#each [...Array(10).keys()] as n}
        <div
          class="w-full flex items-center border-spotify-green border-1 my-2 p-1 animate-pulse rounded-lg gap-2"
        >
          <div
            class="rounded-full bg-surface-800 animate-pulse h-10 w-10"
          ></div>
          <div class="w-full bg-surface-800 animate pulse h-5"></div>
        </div>
      {/each}
    {:else}
      {#each artistTopTracks.tracks as track}
        <button
          class="w-full text-[10px] md:text-sm text-left flex items-center gap-2 border-spotify-green border-1 my-2 p-1 hover:bg-spotify-green/50 transition duration-500 ease-in-out rounded-lg active:scale-95 active:bg-spotify-green/30 text-wrap"
        >
          <div class="h-10 w-10 rounded-full">
            <img
              src={track.album.images[2].url}
              alt={track.name}
              class="w-full h-full cover rounded-lg"
            />
          </div>
          <div>
            <p>
              {track.name}
            </p>
            <div class="flex gap-1 items-center text-xs">
              {#each track.artists as artist}
                <div class="w-1 h-1 rounded-lg bg-spotify-green"></div>
                <p>{artist.name}</p>
              {/each}
            </div>
          </div>
        </button>
      {/each}
    {/if}
  </div>

  <!-- Actions-->
  <div class="flex justify-end mt-5">
    <a
      href={artistData.uri}
      target="_blank"
      class="text-spotify-green font-bold px-5 py-2 rounded-lg flex text-sm"
    >
      Open In Spotify
    </a>
  </div>
</article>
