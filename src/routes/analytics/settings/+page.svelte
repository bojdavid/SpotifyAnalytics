<script lang="ts">
  import { Loader } from "@lucide/svelte";
  //import Spotify_Logo from "../../../../static/Spotify_logo.png";
</script>

<section
  class="h-screen w-full bg-spotify-green flex justify-center items-center"
>
  <!--
    <div class=" animate-spin">
      <Loader size={60} />
    </div>
-->
  <div class=" h-40 relative">
    <span
      class="absolute inline-flex h-full w-full rounded-full bg-spotify-black opacity-50 animate-ping"
    ></span>
    <img src="/spotify_logo.png" alt="spotify logo" class="h-full w-auto" />
  </div>
</section>
