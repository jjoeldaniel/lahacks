<!-- SearchBar.svelte -->
<script>
  import "../app.css";
  import hero from "../assets/hero.jpeg";
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
          hashmap[row.city + "-" + row.county_name + "-" + row.state_id] =
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

<main
  class="h-screen w-screen overflow-auto flex flex-col items-center justify-center bg-gray-800"
>
  <img
    class="w-full h-2/5 absolute top-16 flex justify-center object-bottom object-cover img-gradient opacity-60"
    alt="Hero"
    src={hero}
  />
  <div class="grid grid-cols-4 gap-5 w-1/4 place-items-center">
    <input
      class="bg-gray-600 col-span-3 px- py-2 w-full rounded-lg text-white"
      type="text"
      on:input={filterLocations}
      bind:value={searchTerm}
    />
    <button
      class="col-start-4 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
      on:click={handleSearch}>Search</button
    >
    {#if filteredLocations.length > 0}
      <!-- print all matches as list items -->
      <ul id="autocomplete" class="col-span-4">
        {#each filteredLocations as location}
          <li
            class="bg-gray-600 px-4 py-2 rounded-lg text-white hover:bg-gray-700 cursor-pointer"
            on:click={() => {
              searchTerm = location;
              onSearch(hashmap[location]);
            }}
          >
            {location}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</main>
