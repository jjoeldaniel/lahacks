<script>
    //import { GOOGLE_MAPS_KEY } from  '$env/static/private'; //error when passed to a non +server.ts file 
   
   let GOOGLE_MAPS_KEY="AIzaSyDar1uJPmjRnY9JwAqTfv-JsBBCKlq1874"//google map keys can be public long as they restricted on gmaps cloud service 
  
   /**
   * @type {any}
   */
     export let location; 


</script>


<!-- svelte-ignore a11y-missing-attribute -->
<div class='iframe-wrapper'> 
  <p align="center"> 
<iframe
  width="600"
  height="450"
  style="border:0"
  loading="lazy"
  allowfullscreen
  
  referrerpolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed/v1/place?key={GOOGLE_MAPS_KEY}
    &q={location}">
</iframe>
</p>
</div>


<style>
  .iframe-wrapper{
    padding:20px;
  }
</style>