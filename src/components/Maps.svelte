<script>
    import { GOOGLE_MAPS_KEY } from  '$env/static/private'; //error when passed to a non +server.ts file 

    let location="Space+Needle,Seattle+WA" //works just bind the other string we search to this


</script>


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