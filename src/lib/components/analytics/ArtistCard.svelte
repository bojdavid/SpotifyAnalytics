<script lang="ts">
  import { X, UserPlus } from "@lucide/svelte";
  import { formatFollowerCount } from "$lib/global/functions";

  const longSongTitles = [
    {
      title:
        "The Late Great Planet Earth (Original Soundtrack to the Film of the Same Name)",
      artist: "Funkadelic",
    },
    {
      title: "Smash It Up (What You Gonna Do?)",
      artist: "The Offspring",
    },
    {
      title: "A Quick One, While He's Away",
      artist: "The Who",
    },
    {
      title: "The Loneliest Feeling That I Know (Is Being Next To You)",
      artist: "The Carter Family",
    },
    {
      title:
        "Several Species of Small Furry Animals Gathered Together in a Cave and Grooving with a Pict",
      artist: "Pink Floyd",
    },
    {
      title: "If You Didn't See Me (Then You Weren't Looking)",
      artist: "The Cure",
    },
    {
      title: "The Whole World and You",
      artist: "Andrew Bird's Bowl of Fire",
    },
    {
      title: "I'm Not Sure, But I'm Certainly Not Confident",
      artist: "The Mountain Goats",
    },
    {
      title: "How Long Do I Have to Wait for Everything?",
      artist: "The Killers",
    },
    {
      title:
        "We Don't Know When We're Gettin' Out of Here, But We Know We're Leavin' Soon",
      artist: "Less Than Jake",
    },
  ];

  let { artistData } = $props();
  console.log("This is the artistsData", artistData);
</script>

<article class=" min-w-[250px] max-w-[600px] w-full px-5">
  <header class="flex gap-5 justify-between pt-5">
    <div>
      <h2>{artistData.name}</h2>
      <p class="text-xs">
        <span class="font-light text-surface-400">Followers : </span>
        {formatFollowerCount(artistData.followers.total)}
      </p>
      <button
        class="text-spotify-green rounded-lg text-sm font-bold flex gap-1"
      >
        <span>
          <UserPlus size={20} />
        </span>
        Follow Artist
      </button>
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
    <h4>Top 10 tracks</h4>
    <p class="text-xs text-surface-500">Click On A Track To View It</p>
    {#each longSongTitles as track, idx}
      <button
        class="w-full text-[10px] md:text-sm text-left flex border-spotify-green border-1 my-2 p-1 hover:bg-spotify-green/50 transition duration-500 ease-in-out rounded-lg active:scale-95 text-wrap"
      >
        <div class="mr-2 my-auto">
          {idx + 1}.
        </div>
        {track.title}
      </button>
    {/each}
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
