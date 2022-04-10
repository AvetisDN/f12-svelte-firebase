<script>
  import { globalUser, notification } from "../store";

  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import Sidebar from "./layout/Sidebar.svelte";
  import Header from "./layout/Header.svelte";
  import Footer from "./layout/Footer.svelte";

  onMount(() => {
    if (!$globalUser) {
      notification.set({
        type: "error",
        message: "Sign In to get access to private pages",
      });
      navigate("/");
    }
  });
</script>

<main class="w-full min-h-screen bg-base-300 flex relative">
  <div class="bg absolute w-full h-[35vh] top-0 left-0 bg-primary" />
  <Sidebar />
  <div class="relative p-4 md:pl-0 flex flex-col gap-4 flex-grow">
    {#if $globalUser}
      <Header />
      <div class="page">
        <slot />
      </div>
    {/if}
    <Footer />
  </div>
</main>
