<script>
  import PostItem from "../components/PostItem.svelte";
  import {
    collection,
    query,
    onSnapshot,
    orderBy,
    limit,
  } from "firebase/firestore";
  import { onMount, onDestroy } from "svelte";
  import { db } from "../firebase";

  let posts = [];
  let unsubscribe = () => null;
  let loading = true;
  let showCount = 6;
  onMount(() => {
    fetchData();
  });
  onDestroy(() => {
    unsubscribe();
  });

  function showMore() {
    showCount *= 2;
    fetchData();
  }

  function fetchData() {
    unsubscribe();
    const q = query(
      collection(db, "posts"),
      orderBy("created", "desc"),
      limit(showCount)
    );
    unsubscribe = onSnapshot(q, (snapshot) => {
      let tmp = [];
      snapshot.forEach((doc) => {
        tmp.push({ ...doc.data(), id: doc.id });
      });
      posts = [...tmp];
      loading = false;
    });
  }
</script>

<div>
  <h1 class="text-xl font-bold flex gap-2 items-center">Post Feed</h1>
  <div class="divider" />
  <div class="post-grid grid gap-3">
    {#if loading}
      loading...
    {/if}
    {#if posts.length > 0}
      {#each posts as post}
        <PostItem {post} />
      {/each}
    {/if}
  </div>
  <div class="mt-4 flex justify-center">
    <button class="btn" on:click={showMore}>Show more</button>
  </div>
</div>
