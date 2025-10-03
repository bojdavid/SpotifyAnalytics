<script lang="ts">
  import { Pagination } from "@skeletonlabs/skeleton-svelte";
  // Icons
  import IconArrowLeft from "@lucide/svelte/icons/arrow-left";
  import IconArrowRight from "@lucide/svelte/icons/arrow-right";
  import IconEllipsis from "@lucide/svelte/icons/ellipsis";
  import IconFirst from "@lucide/svelte/icons/chevrons-left";
  import IconLast from "@lucide/svelte/icons/chevron-right";

  import type {
    TopArtists,
    TrackArtistsData,
    TopTracks,
  } from "$lib/types/spotifyTypes1";

  let { topArtists_ } = $props();

  console.log("topArtisitData", topArtists_);

  let topArtists: TopArtists[] = $state([]);

  $effect(() => {
    topArtists = topArtists_.items;
  });

  /*
  const topArtists: TopArtists[] = [
    {
      name: "Taylor Swift",
      image: { url: "#", height: 640, width: 640 },
      followers: 95000000,
      genres: ["pop", "country"],
      href: "#",
      uri: "#",
    },
    {
      name: "Drake",
      image: { url: "#", height: 640, width: 640 },
      followers: 85000000,
      genres: ["hip hop", "rap"],
      href: "#",
      uri: "#",
    },
    {
      name: "The Weeknd",
      image: { url: "#", height: 640, width: 640 },
      followers: 70000000,
      genres: ["r&b", "pop"],
      href: "#",
      uri: "#",
    },
    {
      name: "Beyoncé",
      image: { url: "#", height: 640, width: 640 },
      followers: 63000000,
      genres: ["pop", "r&b"],
      href: "#",
      uri: "#",
    },
    {
      name: "Ed Sheeran",
      image: { url: "#", height: 640, width: 640 },
      followers: 78000000,
      genres: ["pop", "acoustic"],
      href: "#",
      uri: "#",
    },
    {
      name: "Ariana Grande",
      image: { url: "#", height: 640, width: 640 },
      followers: 71000000,
      genres: ["pop", "r&b"],
      href: "#",
      uri: "#",
    },
    {
      name: "Billie Eilish",
      image: { url: "#", height: 640, width: 640 },
      followers: 69000000,
      genres: ["alt pop", "indie pop"],
      href: "#",
      uri: "#",
    },
    {
      name: "Post Malone",
      image: { url: "#", height: 640, width: 640 },
      followers: 60000000,
      genres: ["hip hop", "rap rock"],
      href: "#",
      uri: "#",
    },
    {
      name: "Olivia Rodrigo",
      image: { url: "#", height: 640, width: 640 },
      followers: 55000000,
      genres: ["pop", "indie"],
      href: "#",
      uri: "#",
    },
    {
      name: "Dua Lipa",
      image: { url: "#", height: 640, width: 640 },
      followers: 62000000,
      genres: ["pop", "dance pop"],
      href: "#",
      uri: "#",
    },
    {
      name: "Kendrick Lamar",
      image: { url: "#", height: 640, width: 640 },
      followers: 58000000,
      genres: ["hip hop", "rap"],
      href: "#",
      uri: "#",
    },
    {
      name: "SZA",
      image: { url: "#", height: 640, width: 640 },
      followers: 50000000,
      genres: ["r&b", "neo soul"],
      href: "#",
      uri: "#",
    },
    {
      name: "Doja Cat",
      image: { url: "#", height: 640, width: 640 },
      followers: 48000000,
      genres: ["pop", "hip hop"],
      href: "#",
      uri: "#",
    },
    {
      name: "Bad Bunny",
      image: { url: "#", height: 640, width: 640 },
      followers: 74000000,
      genres: ["reggaeton", "latin trap"],
      href: "#",
      uri: "#",
    },
    {
      name: "Harry Styles",
      image: { url: "#", height: 640, width: 640 },
      followers: 67000000,
      genres: ["pop", "rock"],
      href: "#",
      uri: "#",
    },
    {
      name: "Rihanna",
      image: { url: "#", height: 640, width: 640 },
      followers: 61000000,
      genres: ["pop", "r&b"],
      href: "#",
      uri: "#",
    },
    {
      name: "Shawn Mendes",
      image: { url: "#", height: 640, width: 640 },
      followers: 47000000,
      genres: ["pop", "acoustic"],
      href: "#",
      uri: "#",
    },
    {
      name: "Lizzo",
      image: { url: "#", height: 640, width: 640 },
      followers: 45000000,
      genres: ["pop", "funk"],
      href: "#",
      uri: "#",
    },
    {
      name: "J. Cole",
      image: { url: "#", height: 640, width: 640 },
      followers: 43000000,
      genres: ["hip hop", "rap"],
      href: "#",
      uri: "#",
    },
    {
      name: "Imagine Dragons",
      image: { url: "#", height: 640, width: 640 },
      followers: 55000000,
      genres: ["rock", "pop rock"],
      href: "#",
      uri: "#",
    },
  ];
*/
  const trackArtists: TrackArtistsData[] = [
    { artistsName: "Taylor Swift", id: "1", href: "#", uri: "#" },
    { artistsName: "Drake", id: "2", href: "#", uri: "#" },
    { artistsName: "The Weeknd", id: "3", href: "#", uri: "#" },
    { artistsName: "Ed Sheeran", id: "4", href: "#", uri: "#" },
    { artistsName: "Ariana Grande", id: "5", href: "#", uri: "#" },
    { artistsName: "Billie Eilish", id: "6", href: "#", uri: "#" },
    { artistsName: "Post Malone", id: "7", href: "#", uri: "#" },
    { artistsName: "Olivia Rodrigo", id: "8", href: "#", uri: "#" },
    { artistsName: "Dua Lipa", id: "9", href: "#", uri: "#" },
    { artistsName: "SZA", id: "10", href: "#", uri: "#" },
    { artistsName: "Bad Bunny", id: "11", href: "#", uri: "#" },
    { artistsName: "Harry Styles", id: "12", href: "#", uri: "#" },
    { artistsName: "Rihanna", id: "13", href: "#", uri: "#" },
    { artistsName: "Shawn Mendes", id: "14", href: "#", uri: "#" },
    { artistsName: "Lizzo", id: "15", href: "#", uri: "#" },
    { artistsName: "J. Cole", id: "16", href: "#", uri: "#" },
    { artistsName: "Doja Cat", id: "17", href: "#", uri: "#" },
    { artistsName: "Beyoncé", id: "18", href: "#", uri: "#" },
    { artistsName: "Kendrick Lamar", id: "19", href: "#", uri: "#" },
    { artistsName: "Imagine Dragons", id: "20", href: "#", uri: "#" },
  ];

  let activeTop: string = "topArtists";
  // State
  let page = $state(1);
  let size = $state(5);
  const slicedSource = $derived((s: TopArtists[]) =>
    s.slice((page - 1) * size, page * size)
  );
</script>

<div>
  {#if activeTop == "topArtists"}
    <div class="table-wrap">
      <table class="table caption-bottom">
        <caption class="pt-4">Top Aritsts</caption>
        <thead>
          <tr>
            <th>Aritst</th>
            <th>Followers</th>
            <th>Genres</th>
            <th class="">Weight</th>
          </tr>
        </thead>
        <tbody class="[&>tr]:hover:preset-tonal-primary">
          {#each slicedSource(topArtists) as artists}
            <tr>
              <td>{artists.name}</td>
              <td>{artists.followers.total}</td>
              <td>{artists.genres}</td>
              <td>
                <a
                  href={artists.uri}
                  class="btn btn-preset-filled-primary-500 !text-right"
                >
                  View Artists Data</a
                ></td
              >
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Total</td>
            <td class="text-right">{topArtists.length} Elements</td>
          </tr>
        </tfoot>
      </table>
    </div>
  {/if}
</div>
<!-- Footer -->
<footer class="flex justify-between">
  <select
    name="size"
    id="size"
    class="select max-w-[150px]"
    value={size}
    onchange={(e) => (size = Number(e.currentTarget.value))}
  >
    {#each [3, 6, 9] as v}
      <option value={v}>Items {v}</option>
    {/each}
    <option value={topArtists.length}>Show All</option>
  </select>
  <!-- Pagination -->
  <Pagination
    data={topArtists}
    {page}
    onPageChange={(e) => (page = e.page)}
    pageSize={size}
    onPageSizeChange={(e) => (size = e.pageSize)}
    siblingCount={4}
  >
    {#snippet labelEllipsis()}<IconEllipsis class="size-4" />{/snippet}
    {#snippet labelNext()}<IconArrowRight class="size-4" />{/snippet}
    {#snippet labelPrevious()}<IconArrowLeft class="size-4" />{/snippet}
    {#snippet labelFirst()}<IconFirst class="size-4" />{/snippet}
    {#snippet labelLast()}<IconLast class="size-4" />{/snippet}
  </Pagination>
</footer>
