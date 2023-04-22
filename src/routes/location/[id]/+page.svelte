<script>
  /** @type {import('./$types').PageData} */
  export let data;

  import Papa from "papaparse";
  import { onMount } from "svelte";

  let hashmap = {};
  let city = "";
  let county = "";
  let state_id = "";

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
          if (data.id == row.ID) {
            console.log(row.city);
            city = row.city;
            county = row.county_name;
            state_id = row.state_id;
          }
        });
      },
    });
  });
</script>

<svelte:head>
  <title>{city}, {county}, {state_id}</title>
</svelte:head>

<h1>{data.id}</h1>
<p>{city}, {county} {state_id}</p>
