<!-- SearchBar.svelte -->
<script>
  import "../app.css";
  import hero from "../assets/hero.jpeg"
  export let onSearch;
  let searchTerm = "";

  const handleSearch = () => {
    onSearch(searchTerm);
  };

</script>

  <form class ="h-screen w-full overflow-hidden flex items-center justify-center bg-slate-800"on:submit|preventDefault={() => handleSearch()}>
    <div class="grid grid-cols-6 row-start-5 gap-4 w-3/4 place-items-center">
      <input class="bg-gray-600 col-span-5  px-4 py-2 w-full rounded-lg text-white" type="text" bind:value={searchTerm} />
      <button class="col-start-6 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg">  Search </button>
    </div>   
  </form>
