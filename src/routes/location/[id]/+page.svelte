<script>
  /** @type {import('./$types').PageData} */
  export let data;

  import Papa from "papaparse";
  import { onMount } from "svelte";
 import Maps from "../../../components/Maps.svelte";

  let hashmap = {};
  let city = "New York City";
  let county = "New York";
  let state_id = "NY";

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
            city = row.city;
            county = row.county_name;
            state_id = row.state_id;

            // post to server
            // TODO: Fix this
            let response = fetch("/location/default", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `text=${encodeURIComponent(
                { city } + "," + { county } + "," + { state_id }
              )}`,
            })
              .then((response) => {
                if (response.ok) {
                  console.log(response.json());
                } else {
                  throw new Error("failed to post and recieve reply");
                }
              })
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error("Error occurred:", error);
                // TODO handle error
              });
          }
        });
      },
    });
  });

  export let location;

import Center from "../../../components/Center.svelte";
</script>

<svelte:head>
  <title>{city}, {county}, {state_id}</title>
</svelte:head>

<div class="wrapper"> 
<div
  class="h-screen w-full overflow-hidden flex-col place-items-center"
  style="background-color: white"
>
  <Maps location={city}+{county} /> 

  <h1 class="font-bold text-3xl">{city}, {county}, {state_id}</h1>
<br><br>
  <ul>
    <li>
      <h2 class="font-bold text-2xl">About</h2>
    </li>
    <li>
      <h2 class="font-bold text-2xl">History</h2>
    </li>
    <li>
      <h2 class="font-bold text-2xl">Activities</h2>
    </li>
  </ul>

</div>

</div>




<style>
.wrapper{
  text-align: center;
  justify-content: center;

}

</style>