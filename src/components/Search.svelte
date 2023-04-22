<!-- SearchBar.svelte -->
<script>
  import "../app.css";
  export let onSearch;
  let searchTerm = "";
  let filteredLocations = [];
  let hashmap = {};

  import Papa from "papaparse";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

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
  class="h-screen w-full overflow-hidden flex items-center justify-center"
  on:submit|preventDefault={() => handleSearch()}
>
  <div class="relative w-3/4">
    <div>
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          /></svg
        >
      </div>
      <input
        id="search-input"
        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="search"
        placeholder="New York, Queens NY"
        on:input={filterLocations}
        bind:value={searchTerm}
      />
      <div class="relative">
        <button
          class="text-white absolute right-2.5 bottom-2.5 bg-slate-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </div>

    <!-- show the list of matches below the search bar -->
    <div class="absolute w-full">
      {#if filteredLocations.length > 0}
        <div class="bg-gray-300 w-full rounded-lg col-span-5">
          {#each filteredLocations as location, i}
            <!-- on click, set the value of the search bar to the location and close the list -->

            <!-- if i === hiLiteIndex, make bold -->
            {#if i === hiLiteIndex}
              <div
                class="p-2 cursor-pointer bg-blue-500"
                style="font-weight: bold; color: white;"
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
                on:submit={() => {
                  goto(location);
                }}
                on:click={() => {
                  setInputVal(location);
                }}
              >
                {location}
              </div>{/if}
          {/each}
        </div>
      {/if}
    </div>
  </div>
</form>
