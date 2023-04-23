<script>
  /** @type {import('./$types').PageData} */
  export let data;

  const city = data.props.city;
  const county = data.props.county;
  const state_id = data.props.state_id;
  const html = data.props.html;

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

  <div>{@html html}</div>
</div>
