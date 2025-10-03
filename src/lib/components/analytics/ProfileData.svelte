<script lang="ts">
  let { user } = $props();

  interface ProfileData {
    field: string;
    value: string | number;
  }

  let profileData: ProfileData[] = [
    { field: "email", value: user?.email || "no email" },
    { field: "country", value: user?.country || "no country" },
    { field: "following", value: user?.following || "no following" },
    { field: "followers", value: user?.followers || 0 },
  ];
  // console.log("ProfileData -------------- ", user.href);
</script>

<div class="mx-2">
  <div class="flex justify-start gap-5">
    <div class="h-30 w-30 bg-secondary-900 rounded-full overflow-hidden">
      {#if user.images}
        <img
          src={user.images[0].url}
          alt={user.display_name}
          class="w-full h-full cover"
        />
      {/if}
    </div>
    <h2 class="text-2xl font-bold my-auto">{user.display_name}</h2>
  </div>
  <div class="flex-col gap-3 mt-5">
    {#each profileData as data}
      <div class="text-lg">
        <span class="capitalize font-light">{data.field} :</span>
        <span class="text-secondary-900 font-bold">{data.value}</span>
      </div>
    {/each}
  </div>
</div>
