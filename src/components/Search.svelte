<!-- SearchBar.svelte -->
<script>
  import "../app.css";
  export let onSearch;
  let searchTerm = "";
  let filteredLocations = [];
  let hashmap = {};

  import Papa from "papaparse";
  import { onMount } from "svelte";

  // Load the CSV file using fetch in onMount
  onMount(async () => {
    const response = await fetch("../uscities.csv");
    const csv = await response.text();

    Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        results.data.forEach((row) => {
          hashmap[row.city + ", " + row.county_name + " " + row.state_id] =
            row.ID;
        });
      },
    });
  });

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const filterLocations = (e) => {
    let tempArr = [];
    if (e.target.value.length > 0) {
      // loop through hashmap and check if the key contains the search term
      for (const [key, value] of Object.entries(hashmap)) {
        if (key.toLowerCase().includes(e.target.value.toLowerCase())) {
          tempArr.push(key);
          // max size of 5
          if (tempArr.length == 5) {
            break;
          }
        }
      }
    }
    filteredLocations = tempArr;
  };
</script>

<form
  class="h-screen w-full overflow-hidden flex items-center justify-center bg-slate-800"
  on:submit|preventDefault={() => handleSearch()}
>
  <div class="grid grid-cols-6 row-start-5 gap-4 w-3/4 place-items-center">
    <input
      class="bg-gray-600 col-span-5 px-4 py-2 w-full rounded-lg text-white"
      type="text"
      placeholder="New York, Queens NY"
      on:input={filterLocations}
      bind:value={searchTerm}
    />

    <button
      class="col-start-6 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
    >
      Search
    </button>
  </div>
  <!-- show the list of matches below the search bar -->
  {#if filteredLocations.length > 0}
    <div class="absolute bg-gray-300 w-3/4 rounded-lg">
      {#each filteredLocations as location}
        <div class="p-2 hover:bg-gray-500">
          <a href="/location/{hashmap[location]}">{location}</a>
        </div>
      {/each}
    </div>
  {/if}
</form>
