<script>
  import { Loader } from "@lucide/svelte";
  console.log("hello world");
</script>

<section
  class="h-screen w-full bg-spotify-green flex justify-center items-center"
>
  <div class=" animate-spin">
    <Loader size={60} />
  </div>
</section>
