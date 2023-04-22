<script>
  import "../app.css";
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";
</script>

<div class="flex flex-col min-h-screen">
  <main class="flex-grow">
    <Navbar />
    <slot />
    <Footer />
  </main>
</div>
