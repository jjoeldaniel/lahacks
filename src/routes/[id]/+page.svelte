<script>
  /** @type {import('./$types').PageData} */
  export let data;

  import Papa from "papaparse";
  import { onMount } from "svelte";

  let hashmap = {};

  // Load the CSV file using fetch in onMount
  onMount(async () => {
    const response = await fetch("./uscities.csv");
    const csv = await response.text();

    Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        results.data.forEach((row) => {
          const id = row.ID;
          const city = row.city;

          hashmap[id] = city;
        });
      },
    });
  });
</script>

<h1>{data.id}</h1>
<p>{hashmap[data.id]}</p>
