<script>
  /** @type {import('./$types').PageData} */
  export let data;

  const city = data.props.city;
  const county = data.props.county;
  const state_id = data.props.state_id;

  import Maps from "../../../components/Maps.svelte";
</script>

<svelte:head>
  <title>{city}, {county}, {state_id}</title>
</svelte:head>

<div
  class="h-screen w-full overflow-hidden flex items-center justify-center"
  style="background-color: white"
>
  <Maps location="{city}+{county}" />

  <h1 class="font-bold text-3xl">{city}, {county} {state_id}</h1>

  <ul>
    <li>
      <h2 class="font-bold text-2xl">About</h2>
      <p>{data.props.about}</p>
    </li>
    <li>
      <h2 class="font-bold text-2xl">History</h2>
      <p>{data.props.history}</p>
    </li>
    <li>
      <h2 class="font-bold text-2xl">Activities</h2>
      <p>{data.props.activities}</p>
    </li>
  </ul>
</div>
