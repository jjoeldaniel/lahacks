<!-- SearchBar.svelte -->
<script>
    export let onSearch;
    let searchTerm = "";
    
    const handleSearch = () => {
      onSearch(searchTerm);
    };
  </script>
  
  
  <div>
    <input type="text" bind:value={searchTerm} />
    <button on:click={handleSearch}>Search</button>
  </div>
  