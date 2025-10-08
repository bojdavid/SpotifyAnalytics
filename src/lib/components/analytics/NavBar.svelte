<script lang="ts">
  import LightSwitch from "../LightSwitch.svelte";
  import { Menu } from "@lucide/svelte";
  let { username, country, email, imageUrl, toggleSideBar } = $props();
</script>

<nav class=" flex justify-between px-5 pt-5 bg-white/30 backdrop-blur w-full">
  <div>
    <div class="flex gap-2 items-center">
      <h4 class="text-3xl">
        Welcome {username}
      </h4>
    </div>
    <p class=" text-surface-200 text-[8px] md:text-xs">
      {country} <span>||</span>
      {email}
    </p>
  </div>
  <div class="flex gap-5 justify-end items-center">
    <input
      type="text"
      placeholder="Search for a song"
      class="w-[150px] md:w-xs h-7 border rounded-lg px-5"
    />
    <div class="md:block hidden">
      <LightSwitch />
    </div>
    <button class="md:hidden" onclick={toggleSideBar}><Menu size={20} /></button
    >
  </div>
</nav>
