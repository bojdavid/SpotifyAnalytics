<script lang="ts">
  import { tdClass } from "$lib/utils/table";
  import { Pagination } from "@skeletonlabs/skeleton-svelte";
  // Icons
  import IconArrowLeft from "@lucide/svelte/icons/arrow-left";
  import IconArrowRight from "@lucide/svelte/icons/arrow-right";
  import IconEllipsis from "@lucide/svelte/icons/ellipsis";
  import IconFirst from "@lucide/svelte/icons/chevrons-left";
  import IconLast from "@lucide/svelte/icons/chevron-right";

  import { formatDuration } from "$lib/global/functions";
  import Modal from "$lib/components/common/Modal.svelte";
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";

  let { playlistTracks } = $props();

  const fields: string[] = ["Track", "Artist(s)", "Duration", "Popularity"];

  // State
  let page = $state(1);
  const size = 10;
  const slicedSource = $derived((s: any) =>
    s.slice((page - 1) * size, page * size)
  );

  //handle dialog
  let activeTrack: any = $state("0");
  let openModal: boolean = $state(false);

  const setActiveIndex = (i: string) => {
    activeTrack = playlistTracks.items.filter(
      (item: any) => item.track.id === i
    );
    openModal = true;
  };
  const closeModalFromParent = () => {
    openModal = false;
  };
</script>

<div class="bg-surface-100-800-token border border-surface-200-700-token rounded-2xl shadow-xl overflow-hidden">
  <div class="overflow-x-auto w-full">
    <table class="w-full text-left border-collapse whitespace-nowrap">
      <thead class="bg-surface-200-700-token/50 border-b border-surface-200-700-token">
        <tr>
          {#each fields as field}
            <th class="px-4 sm:px-6 py-4 text-xs font-bold text-surface-500-400-token uppercase tracking-wider">
              {field}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody class="divide-y divide-surface-200-700-token">
        {#key playlistTracks.href}
          {#each slicedSource(playlistTracks.items) as track, idx (track)}
            <tr
              class="hover:bg-surface-200-700-token/50 transition-colors duration-200 ease-in-out cursor-pointer group"
              in:fly={{
                x: -20,
                opacity: 0,
                duration: 300,
                delay: idx * 50,
              }}
              animate:flip={{ duration: 300 }}
              onclick={() => setActiveIndex(track.track.id)}
            >
              <td class="px-4 sm:px-6 py-3">
                <div class="flex items-center gap-3 sm:gap-4">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 relative">
                    <img
                      src={track.track.album.images[2]?.url || track.track.album.images[0]?.url}
                      alt={track.track.name}
                      loading="lazy"
                      class="object-cover rounded-md w-full h-full shadow-sm group-hover:shadow-md transition-shadow"
                    />
                    <div class="absolute inset-0 bg-black/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <!-- Play icon placeholder -->
                    </div>
                  </div>
                  <div class="flex flex-col min-w-0 max-w-[150px] sm:max-w-[300px]">
                    <span class="text-sm sm:text-base font-bold text-surface-900-50-token truncate group-hover:text-[var(--color-spotify-green)] transition-colors">
                      {track.track.name}
                    </span>
                    <!-- Show artists on mobile under track name to save space -->
                    <span class="text-xs text-surface-500-400-token truncate sm:hidden">
                      {track.track.artists.map((a: any) => a.name).join(", ")}
                    </span>
                  </div>
                </div>
              </td>
              
              <!-- Artists Column (Hidden on very small screens) -->
              <td class="px-4 sm:px-6 py-3 hidden sm:table-cell">
                <div class="text-sm text-surface-600-300-token max-w-[120px] md:max-w-[200px] truncate">
                  {track.track.artists.map((a: any) => a.name).join(", ")}
                </div>
              </td>
              
              <td class="px-4 sm:px-6 py-3 text-sm text-surface-500-400-token font-medium">
                {formatDuration(track.track.duration_ms)}
              </td>
              
              <td class="px-4 sm:px-6 py-3">
                <div class="flex items-center gap-3">
                  <div class="text-sm font-bold text-surface-700-200-token w-6 text-right">
                    {track.track.popularity}
                  </div>
                  <div class="hidden sm:block w-24 bg-surface-300-600-token rounded-full h-2 overflow-hidden">
                    <div
                      class="h-full rounded-full bg-gradient-to-r from-[var(--color-spotify-green)] to-emerald-400 shadow-[0_0_10px_rgba(30,215,96,0.5)]"
                      style={`width: ${track.track.popularity}%`}
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
          {/each}
        {/key}
      </tbody>
    </table>
  </div>
  
  <footer class="p-4 sm:p-6 border-t border-surface-200-700-token flex justify-center bg-surface-50-950-token/50">
    <Pagination
      data={playlistTracks.items}
      {page}
      onPageChange={(e) => (page = e.page)}
      pageSize={size}
      siblingCount={1}
      class="scale-90 sm:scale-100"
    >
      {#snippet labelEllipsis()}<IconEllipsis class="size-4" />{/snippet}
      {#snippet labelNext()}<IconArrowRight class="size-4" />{/snippet}
      {#snippet labelPrevious()}<IconArrowLeft class="size-4" />{/snippet}
      {#snippet labelFirst()}<IconFirst class="size-4" />{/snippet}
      {#snippet labelLast()}<IconLast class="size-4" />{/snippet}
    </Pagination>
  </footer>
</div>

<Modal
  cardType="track"
  cardData={activeTrack[0]?.track}
  {openModal}
  {closeModalFromParent}
/>
