<script>
  import Sidebar from "./layout/Sidebar.svelte";
  import Header from "./layout/Header.svelte";
  import Footer from "./layout/Footer.svelte";
</script>

<main class="w-full min-h-screen bg-base-300 flex relative">
  <div class="bg absolute w-full h-[35vh] top-0 left-0 bg-primary" />
  <Sidebar />
  <div class="relative p-4 md:pl-0 flex flex-col gap-4 flex-grow">
    <Header />
    <div class="page">
      <slot />
    </div>
    <Footer />
  </div>
</main>
