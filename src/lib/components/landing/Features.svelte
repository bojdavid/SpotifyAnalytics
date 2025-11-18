<script>
  import {
    UserCheck,
    Music,
    ListMusic,
    Search,
    Clock10,
    Info,
  } from "@lucide/svelte";
</script>

<section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
  <div class="max-w-7xl mx-auto">
    <h3 class="text-3xl sm:text-4xl font-bold text-center mb-4">
      What You'll Discover
    </h3>
    <p
      class="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto"
    >
      Dive deep into your Spotify data with powerful analytics and insights
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Feature 1 -->
      <div
        class="feature-card bg-white dark:bg-black p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
      >
        <div
          class="w-12 h-12 bg-spotify-green/10 rounded-lg flex items-center justify-center mb-4"
        >
          <UserCheck class="w-6 h-6 text-spotify-green" />
        </div>
        <h4 class="text-xl font-bold mb-3">Top Artists</h4>
        <p class="text-gray-600 dark:text-gray-400">
          View your most-listened artists from the past year, 6 months, or 4
          weeks. See who dominates your playlist.
        </p>
      </div>

      <!-- Feature 2 -->
      <div
        class="feature-card bg-white dark:bg-black p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
      >
        <div
          class="w-12 h-12 bg-spotify-green/10 rounded-lg flex items-center justify-center mb-4"
        >
          <Music class="w-6 h-6 text-spotify-green" />
        </div>
        <h4 class="text-xl font-bold mb-3">Top Tracks</h4>
        <p class="text-gray-600 dark:text-gray-400">
          Discover your favorite songs across different time periods. Relive the
          tracks you can't stop playing.
        </p>
      </div>

      <!-- Feature 3 -->
      <div
        class="feature-card bg-white dark:bg-black p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
      >
        <div
          class="w-12 h-12 bg-spotify-green/10 rounded-lg flex items-center justify-center mb-4"
        >
          <ListMusic class="w-6 h-6 text-spotify-green" />
        </div>
        <h4 class="text-xl font-bold mb-3">Your Playlists</h4>
        <p class="text-gray-600 dark:text-gray-400">
          Browse through all your playlists and explore the music collections
          you've curated over time.
        </p>
      </div>

      <!-- Feature 4 -->
      <div
        class="feature-card bg-white dark:bg-black p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
      >
        <div
          class="w-12 h-12 bg-spotify-green/10 rounded-lg flex items-center justify-center mb-4"
        >
          <Search class="w-6 h-6 text-spotify-green" />
        </div>
        <h4 class="text-xl font-bold mb-3">Universal Search</h4>
        <p class="text-gray-600 dark:text-gray-400">
          Search for any song, artist, album, or episode. Find exactly what
          you're looking for instantly.
        </p>
      </div>

      <!-- Feature 5 -->
      <div
        class="feature-card bg-white dark:bg-black p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
      >
        <div
          class="w-12 h-12 bg-spotify-green/10 rounded-lg flex items-center justify-center mb-4"
        >
          <Info class="w-6 h-6 text-spotify-green" />
        </div>
        <h4 class="text-xl font-bold mb-3">Detailed Information</h4>
        <p class="text-gray-600 dark:text-gray-400">
          Get comprehensive details on tracks, artists, albums, and playlists
          including stats and metadata.
        </p>
      </div>

      <!-- Feature 6 -->
      <div
        class="feature-card bg-white dark:bg-black p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
      >
        <div
          class="w-12 h-12 bg-spotify-green/10 rounded-lg flex items-center justify-center mb-4"
        >
          <Clock10 class="w-6 h-6 text-spotify-green" />
        </div>
        <h4 class="text-xl font-bold mb-3">Time-Based Analytics</h4>
        <p class="text-gray-600 dark:text-gray-400">
          Compare your listening patterns across the past year, 6 months, and 4
          weeks to see how your taste evolves.
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  .feature-card {
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }
  .feature-card:hover {
    transform: translateY(-5px);
  }
</style>
