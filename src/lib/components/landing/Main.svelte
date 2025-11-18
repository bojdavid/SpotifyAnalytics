<script lang="ts">
  import Header from "./Header.svelte";
  import HeroSection from "./HeroSection.svelte";
  import Features from "./Features.svelte";
  import CTA from "./CTA.svelte";

  let { authorize }: { authorize: () => void } = $props();

  const currentYear = new Date().getFullYear();
</script>

<Header />
<HeroSection {authorize} />
<Features />
<CTA {authorize} />
<!-- Footer -->
<footer
  class="border-t border-gray-200 dark:border-gray-800 py-8 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-400">
    <p>
      &copy; {currentYear} BOJ Spotify Analytics. Built with ❤️ for music lovers.
    </p>
  </div>
</footer>
