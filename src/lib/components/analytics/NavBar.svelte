<script lang="ts">
  import LightSwitch from "../LightSwitch.svelte";
  import { Menu } from "@lucide/svelte";
  let { username, country, email, imageUrl, toggleSideBar } = $props();
  import SearchModal from "./search/SearchModal.svelte";
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
  <div class="flex gap-5 justify-end items-center relative">
    <SearchModal />
    <div class="sm:block hidden">
      <LightSwitch />
    </div>
    <button class="md:hidden" onclick={toggleSideBar}><Menu size={20} /></button
    >
  </div>
</nav>
