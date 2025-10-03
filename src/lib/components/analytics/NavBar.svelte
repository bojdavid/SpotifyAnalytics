<script lang="ts">
  import LightSwitch from "../LightSwitch.svelte";
  let { username, country, email, imageUrl } = $props();
</script>

<nav
  class=" flex justify-between px-5 pt-5 sticky top-0 z-10 bg-white/30 backdrop-blur w-full"
>
  <div>
    <div class="flex gap-2 items-center">
      <h4 class="text-3xl">
        Welcome {username}
      </h4>
      <div class="rounded-full overflow-hidden">
        <img
          src={imageUrl.url}
          alt="profile piture of {username} rounded-full"
        />
      </div>
    </div>
    <p>{country}, {email}</p>
  </div>
  <div class="flex gap-5 justify-end items-center">
    <input
      type="text"
      placeholder="Search for a song"
      class="w-xs h-7 border rounded-lg px-5"
    />
    <div>
      <LightSwitch />
    </div>
  </div>
</nav>
