<script lang="ts">
  let { title, data, action, type, background } = $props();

  const sampleData: { name: string; subname: string }[] = [
    {
      name: "The Great Barrier Reef",
      subname: "World's Largest Coral System",
    },
    {
      name: "Quantum Computing Fundamentals",
      subname: "Principles of Superposition and Entanglement",
    },
    {
      name: "Renaissance Art History",
      subname: "Highlighting Da Vinci and Michelangelo",
    },
    {
      name: "Sustainable Urban Planning Initiatives",
      subname: "Green Infrastructure Development",
    },
    {
      name: "Fictional Character Development Workshop",
      subname: "Creating Compelling Backstories",
    },
    {
      name: "Advanced Financial Modeling Techniques",
      subname: "Monte Carlo Simulation Approach",
    },
    {
      name: "The Silk Road's Cultural Impact",
      subname: "Ancient Trade Routes and Exchange",
    },
    {
      name: "Mastering Adobe Photoshop CC",
      subname: "Raster Graphics Editing and Retouching",
    },
    {
      name: "Global Climate Change Projections",
      subname: "IPCC 2025 Report Summary",
    },
    {
      name: "Effective Public Speaking Strategies",
      subname: "Conquering Stage Fright and Audience Engagement",
    },
  ];
  console.log(type, "-----", data);
</script>

<article class=" min-w-40 w-full max-w-[400px] bg-{background} px-3 mx-5">
  <h3 class="text-center font-bold">{title}</h3>
  <div class="">
    {#each data as d, idx}
      <div>
        <div class=" text-xs md:text-md font-semibold flex gap-6">
          <div class="w-2">#{idx + 1}</div>
          {#if type == "track"}
            <p>{d.name}</p>
          {/if}
          {#if type == "artist"}
            <p>{d.name}</p>
          {/if}
          {#if type == "recent"}
            <p>{d.track.name}</p>
          {/if}
        </div>
        <div class="text-xs font-medium text-spotify-black/50 flex gap-6">
          <div class="w-2"></div>
          {#if type == "track"}
            <p>{d.id}</p>
          {/if}
          {#if type == "artist"}
            <p>{d.id}</p>
          {/if}
          {#if type == "recent"}
            <p>{d.track.id}</p>
          {/if}
        </div>
      </div>
    {/each}
  </div>
  <div>
    <button onclick={() => action()} class="float-right"> View more >> </button>
  </div>
</article>
