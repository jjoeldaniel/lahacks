<script>
  /** @type {import('./$types').PageData} */
  export let data;

  const city = data.props.city;
  const county = data.props.county;
  const state_id = data.props.state_id;
  const html = data.props.html;

  import Maps from "../../../components/Maps.svelte";
  import Center from "../../../components/Center.svelte";
</script>

<svelte:head>
  <title>{city}, {county}, {state_id}</title>
</svelte:head>

<Center> 
  <div class="left-wrapper" >
  
   <div class="outer-wrapper">
      <div class="wrapper"> 
    
  <div
    class="h-auto w-full flex-col place-items-center p-4 rounded-2xl"
    style="background-color: white"
  >
    <Maps location={city}+{county} /> 

 <div>{@html html}</div>
</div>
</div>
</div>
  </div>
</Center>



<style>

  .left-wrapper{
    text-align:center;
    padding:10px;

  }

  .outer-wrapper
  {
    padding:10px;
    height:fit-content;
    display: inline-block; 
    text-align: left;
    overflow-x: hidden;

  }
.wrapper{
  text-align: left;
  justify-content: center;

  overflow-x: hidden;

}




</style>