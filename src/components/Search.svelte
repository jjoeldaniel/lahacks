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
    onSearch(hashmap[searchTerm]);
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

  const setInputVal = (name) => {
    searchTerm = name;
    filteredLocations = [];
    hiLiteIndex = null;
    document.querySelector("#search-input").focus();
  };

  let hiLiteIndex = null;
  const navigateList = (e) => {
    if (e.key === "ArrowDown" && hiLiteIndex == filteredLocations.length - 1) {
      hiLiteIndex = 0;
    } else if (
      e.key === "ArrowDown" &&
      hiLiteIndex <= filteredLocations.length - 1
    ) {
      hiLiteIndex === null ? (hiLiteIndex = 0) : (hiLiteIndex += 1);
    } else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
      hiLiteIndex === 0
        ? (hiLiteIndex = filteredLocations.length - 1)
        : (hiLiteIndex -= 1);
    } else if (e.key === "Enter") {
      setInputVal(filteredLocations[hiLiteIndex]);
    } else {
      return;
    }
  };
</script>

<svelte:window on:keydown={navigateList} />

<form
  class="h-screen w-full overflow-hidden flex items-center justify-center bg-slate-800"
  on:submit|preventDefault={() => handleSearch()}
>
  <div class="grid grid-cols-6 row-start-5 gap-4 w-3/4 place-items-center">
    <input
      id="search-input"
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
      {#each filteredLocations as location, i}
        <!-- on click, set the value of the search bar to the location and close the list -->

        <!-- if i === hiLiteIndex, make bold -->
        {#if i === hiLiteIndex}
          <div
            class="p-2 hover:bg-gray-400 cursor-pointer"
            style="font-weight: bold"
            on:click={() => {
              setInputVal(location);
            }}
          >
            {location}
          </div>
        {/if}
        {#if i != hiLiteIndex}
          <div
            class="p-2 cursor-pointer"
            on:click={() => {
              setInputVal(location);
            }}
          >
            {location}
          </div>{/if}
      {/each}
    </div>
  {/if}
</form>
