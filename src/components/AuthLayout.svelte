<script>
  import { globalUser } from "../store";

  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";

  onMount(() => {
    if ($globalUser) navigate("/");
  });
</script>

<main
  class="w-full min-h-screen bg-base-300 flex items-center justify-center relative"
>
  <div class="bg absolute w-full h-[50vh] top-0 left-0 bg-primary" />
  <div
    class="bg-base-100 p-4 lg:p-6 rounded-none sm:rounded-lg shadow-xl relative min-w-[320px]"
  >
    {#if !$globalUser}
      <slot />
    {/if}
  </div>
</main>
