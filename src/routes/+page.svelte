<!-- SearchPage.svelte -->
<script>
  import Search from "../components/Search.svelte";
  import { goto } from "$app/navigation";

  export const handleSearch = (/** @type {any} */ searchTerm) => {
    goto(`/location/${searchTerm}`);
  };
</script>

<Search onSearch={handleSearch} />
