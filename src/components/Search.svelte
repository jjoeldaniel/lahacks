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

<main class="h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
  <div class=" flex justify-center">
  </div>  
    <div class="ablsoute bottom-10 grid grid-cols-6 gap-4 w-3/4 place-items-center">
      <input class="bg-gray-600 col-span-5 px-4 py-2 w-full rounded-lg text-white" type="text" bind:value={searchTerm} />
      <button class="col-start-6 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg" on:click={handleSearch}>Search</button>
    </div> 
</main>

