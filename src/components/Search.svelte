<!-- SearchBar.svelte -->
<script>
    import "../app.css";
    export let onSearch;
    let searchTerm = "";
    
    const handleSearch = () => {
      onSearch(searchTerm);
    };
  </script>
  
  
  <div class="bg-blue-500">
    <input class="" type="text" bind:value={searchTerm} />
    <button class="" on:click={handleSearch}>Search</button>
  </div>
  