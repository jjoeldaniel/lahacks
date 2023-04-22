<!-- SearchPage.svelte -->
<script>
    import Search from "../components/Search.svelte"; 
    import { goto } from '$app/navigation';
    
    
             export let searchTerm
    
           export const handleSearch = (/** @type {any} */ searchTerm) => {
                goto(`/${searchTerm}`);
            };
    
            
          </script>
          
          <h1>Search</h1>
          
          <Search onSearch={handleSearch} />
          