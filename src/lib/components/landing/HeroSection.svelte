<script lang="ts">
  let { authorize }: { authorize: () => void } = $props();
</script>

<section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
      Unlock Your <span class="text-spotify-green">Spotify</span> Story
    </h2>
    <p
      class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
    >
      Connect your Spotify account and get an in-depth analytics of your
      listening habits, top artists, favorite tracks, and more.
    </p>
    <button
      onclick={authorize}
      class="px-8 py-4 bg-spotify-green text-white font-bold rounded-lg text-lg hover:bg-transparent hover:border-2 hover:border-spotify-green hover:text-spotify-green transition duration-300 shadow-lg shadow-spotify-green/30"
    >
      Login With Spotify
    </button>
  </div>
</section>
