<script lang="ts">
  let { user } = $props();

  interface ProfileData {
    field: string;
    value: string | number;
  }

  let profileData: ProfileData[] = [
    { field: "email", value: "email@eamil.gom" },
    { field: "country", value: "Nigeria" },
    { field: "following", value: 30 },
    { field: "followers", value: 0 },
  ];
</script>

<div class="mx-2">
  <div class="flex justify-start gap-5">
    <div class="h-30 w-30 bg-secondary-900 rounded-full"></div>
    <h2 class="text-2xl font-bold my-auto">UserName</h2>
  </div>
  <div class="flex-col gap-3 mt-5">
    {#each profileData as data}
      <div class="text-lg">
        <span class="capitalize font-light">{data.field} :</span>
        <span class="text-secondary-900 font-bold">{data.value}</span>
      </div>
    {/each}

    <!--
        <img
          src={user.images.url}
          alt=""
          height={user.images.height}
          width={user.images.width}
        />
    -->
  </div>
</div>
