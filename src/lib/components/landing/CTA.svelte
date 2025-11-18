<script lang="ts">
  let { authorize }: { authorize: () => void } = $props();
</script>

<!-- CTA Section -->
<section class="py-20 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto text-center">
    <h3 class="text-3xl sm:text-4xl font-bold mb-6">
      Ready to Explore Your Music?
    </h3>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Connect your Spotify account now and start discovering insights about your
      listening habits.
    </p>
    <button
      onclick={authorize}
      class="px-8 py-4 bg-spotify-green text-white font-bold rounded-lg text-lg hover:bg-transparent hover:border-2 hover:border-spotify-green hover:text-spotify-green transition duration-300 shadow-lg shadow-spotify-green/30"
    >
      Get Started
    </button>
  </div>
</section>
