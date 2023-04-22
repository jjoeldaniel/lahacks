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

<main class="h-screen w-screen overflow-auto flex flex-col items-center justify-center bg-gray-800">
  <img class="w-full h-2/5 absolute top-16 flex justify-center object-bottom object-cover img-gradient opacity-60" alt="Hero" src={hero}/>
  <div class="grid grid-cols-4 gap-5 w-1/4 place-items-center">
    <input class="bg-gray-600 col-span-3 px- py-2 w-full rounded-lg text-white" type="text" bind:value={searchTerm} />
    <button class="col-start-4 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg" on:click={handleSearch}>Search</button>
  </div> 
</main>

