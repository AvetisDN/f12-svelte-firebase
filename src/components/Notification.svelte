<script>
  import { notification } from "../store";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";

  onMount(() => {
    setTimeout(() => {
      notification.set(null);
    }, 5000);
  });

  const close = () => {
    notification.set(null);
  };
</script>

{#if $notification}
  <div class=" fixed top-4 w-full flex justify-center" transition:slide>
    <div class={`alert shadow-lg w-auto alert-${$notification.type}`}>
      <div>
        <span>{$notification.message}</span>
      </div>
      <button class="fpnt-bold text-lg" on:click={close}> &times; </button>
    </div>
  </div>
{/if}
<div class="hidden alert-warning alert-info alert-success alert-error" />
