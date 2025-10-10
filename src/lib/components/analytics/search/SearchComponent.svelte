<script lang="ts">
  import { Search } from "@lucide/svelte";
  let searchValue: string = $state("");
  let timeoutId: number | null = null;

  const handleSearch = async (query: string) => {
    if (query.length < 3) {
      // Only start searching after 3 characters
      return;
    }

    console.log("working !!");
    /*
    try {
      //const response = await fetch(`${API_URL}?q=${query}`);
      const response = await fetch("/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data); // Handle the search results as needed
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    */
  };

  const handleInputChange = (event: Event) => {
    const query = (event.target as HTMLInputElement).value;
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      handleSearch(query);
    }, 1000); // 1 second delay
  };
</script>

<section class=" mx-2 h-[400px] px-5">
  <div class="flex justify-center pt-5">
    <div class="relative w-[700px]">
      <Search
        size={20}
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search for a song"
        class=" max-w-[700px] w-full border rounded-lg px-5 pl-10 py-5 text-lg"
        bind:value={searchValue}
        oninput={handleInputChange}
      />
    </div>
  </div>
</section>
