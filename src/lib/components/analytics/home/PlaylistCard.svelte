<script>
  let { playlistData } = $props();
</script>

<!-- Playlist Card -->
<div
  class="bg-white/50 dark:bg-spotify-black/50 backdrop-blur rounded-xl shadow-lg overflow-hidden max-w-[300px] hover:shadow-2xl transition-shadow duration-300"
>
  <!-- Image Section -->
  <div class="relative">
    <img
      src={playlistData.images[0].url}
      alt={playlistData.name}
      class="w-[300px] h-[300px] object-cover"
      loading="lazy"
    />
    <!-- Public Badge -->
    <div class="absolute top-3 right-3">
      <span
        class="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full"
      >
        {playlistData.public ? "Public" : "Private"}
      </span>
    </div>
    <!-- Playlist Type Badge -->
    <div class="absolute top-3 left-3">
      <span
        class="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
      >
        Playlist
      </span>
    </div>
  </div>

  <!-- Content Section -->
  <div class="p-6">
    <!-- Playlist Name -->
    <h4 class="font-bold mb-2 text-wrap">
      {playlistData.name}
    </h4>

    <!-- Description -->
    <p class="font-light text-sm mb-4">{playlistData.description}</p>

    <!-- Owner Info -->
    <div class="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
      <div
        class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
      >
        R
      </div>
      <div>
        <p class="text-xs text-gray-500">Created by</p>
        <p class="text-sm font-semibold">
          {playlistData.owner.display_name}
        </p>
      </div>
    </div>

    <!-- Stats -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"
          />
        </svg>
        <span class="text-sm font-medium"
          >{playlistData.tracks.total} tracks</span
        >
      </div>

      <div class="flex items-center gap-2">
        <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
          {playlistData.collaborative ? "Collaborative" : "Solo"}
        </span>
      </div>
    </div>

    <!-- Action Button -->
    <a
      href="https://open.spotify.com/playlist/3ybJJbrax94AlsUqQ47EL1"
      target="_blank"
      class="block w-full bg-green-500 hover:bg-green-600 text-white text-center font-semibold py-3 rounded-lg transition-colors duration-200"
    >
      Open in Spotify
    </a>

    <!-- Playlist ID -->
    <div class="mt-4 pt-4 border-t border-gray-200">
      <p class="text-xs text-gray-500">Playlist ID</p>
      <p class="text-xs font-mono text-gray-700 break-all">
        {playlistData.id}
      </p>
    </div>
  </div>
</div>
