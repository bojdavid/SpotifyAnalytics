<script lang="ts">
  import TopCard from "$lib/components/analytics/home/TopCard.svelte";
  import { onMount, tick } from "svelte";
  import { getTopArtists } from "../../api/artists";
  import { getTopTracks, getRecentTracks } from "../../api/tracks";
  import { getUsersPlaylists } from "../../api/playlist";
  import { goto } from "$app/navigation";
  import LoaderM from "$lib/components/common/LoaderM.svelte";
  import { fly } from "svelte/transition";
  import { setCurrentTop, type TopFilter } from "$lib/global/filter.svelte";
  import PlaylistsTable from "$lib/components/analytics/home/PlaylistsTable.svelte";

  let visible = $state(false);

  let topTracksData: any = $state(null);
  let topArtistsData: any = $state(null);
  let recentTracksData: any = $state(null);
  let playlists: any = $state(null);

  let loading = $state(true);

  function isValidToken(t: unknown) {
    return typeof t === "string" && t !== "" && t !== "undefined";
  }

  function parseApiError(e: unknown): { status?: number; message: string } {
    // handle Errors thrown with JSON message or plain strings
    if (e instanceof Error) {
      try {
        const parsed = JSON.parse(e.message);
        return {
          status: parsed?.status,
          message: parsed?.message ?? e.message,
        };
      } catch {
        return { message: e.message };
      }
    }
    return { message: String(e) };
  }

  onMount(async () => {
    loading = true;
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!isValidToken(accessToken)) {
        goto("/auth");
        return;
      }

      // Run in parallel but don’t fail all if one fails
      const [tracksRes, artistsRes, recentRes, playlistsRes] =
        await Promise.allSettled([
          getTopTracks(accessToken!),
          getTopArtists(accessToken!),
          getRecentTracks(accessToken!),
          getUsersPlaylists(accessToken!),
        ]);

      if (tracksRes.status === "fulfilled") topTracksData = tracksRes.value;
      if (artistsRes.status === "fulfilled") topArtistsData = artistsRes.value;
      if (recentRes.status === "fulfilled") recentTracksData = recentRes.value;
      if (playlistsRes.status === "fulfilled") playlists = playlistsRes.value;

      // If any call failed with 401, redirect
      const failures = [tracksRes, artistsRes, recentRes, playlistsRes].filter(
        (r) => r.status === "rejected"
      ) as PromiseRejectedResult[];

      const authFailed = failures.some((r) => {
        const pe = parseApiError(r.reason);
        return pe.status === 401 || /401/.test(pe.message);
      });

      if (authFailed) {
        goto("/auth");
        return;
      }

      // Optional: show a generic error if everything failed
      if (
        !topTracksData &&
        !topArtistsData &&
        !recentTracksData &&
        !playlists
      ) {
        console.error("All data requests failed.");
        alert("Unable to load your Spotify data right now. Please try again.");
      }
    } catch (e) {
      const pe = parseApiError(e);
      console.error("Load error:", pe.message);
      alert(`Error: ${pe.message}`);
    } finally {
      await tick();
      loading = false;
      visible = true;
    }
  });

  const viewMore = (data: TopFilter) => {
    setCurrentTop(data);
    goto("/analytics/top");
  };
</script>

<section class="py-10">
  {#if loading}
    <div class="h-screen w-full flex justify-center items-center">
      <LoaderM />
    </div>
  {:else if visible}
    <h1 class="mx-5">Your Summary</h1>

    <div
      class="flex gap-5 justify-center flex-wrap my-10"
      transition:fly={{ y: 50, duration: 600 }}
    >
      {#if topTracksData?.items}
        <TopCard
          title="Top 10 Tracks"
          data={topTracksData.items.slice(0, 10)}
          action={viewMore}
          type="top-tracks"
          background="bg-yellow-500"
        />
      {/if}

      {#if topArtistsData?.items}
        <TopCard
          title="Top 10 Artists"
          data={topArtistsData.items.slice(0, 10)}
          action={viewMore}
          type="top-artists"
          background="bg-surface-500"
        />
      {/if}

      {#if recentTracksData?.items}
        <TopCard
          title="Listening History"
          data={recentTracksData.items.slice(0, 10)}
          action={viewMore}
          type="top-recent"
          background="bg-red-500"
        />
      {/if}
    </div>

    {#if playlists?.items}
      <div class="flex justify-center">
        <PlaylistsTable {playlists} />
      </div>
    {/if}
  {/if}
</section>
