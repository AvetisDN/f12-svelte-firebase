<script>
  import { onMount, onDestroy } from "svelte";
  import { fly } from "svelte/transition";
  import {
    doc,
    onSnapshot,
    updateDoc,
    collection,
    query,
    where,
    orderBy,
    addDoc,
  } from "firebase/firestore";
  import { useParams } from "svelte-navigator";
  import { db } from "../firebase";
  import { globalUser } from "../store";
  import moment from "moment";
  const params = useParams();
  $: postID = $params.id;

  let post = null;
  let likes = [];
  let likedByCurrent = false;
  let comment = "";
  let comments = [];
  let unsubscribe = () => null;
  let unsubscribeComments = () => null;

  onMount(() => {
    fetchData();
  });
  onDestroy(() => {
    unsubscribe();
    unsubscribeComments();
  });

  function fetchData() {
    unsubscribe();
    const ref = doc(db, "posts", postID);
    unsubscribe = onSnapshot(ref, (snapshot) => {
      post = snapshot.data();
      likes = post.likes || [];
      likedByCurrent = likes.includes($globalUser.uid);
    });
    const q = query(
      collection(db, "comments"),
      orderBy("created", "desc"),
      where("postID", "==", postID)
    );
    unsubscribeComments = onSnapshot(q, (snapshot) => {
      let tmp = [];
      snapshot.forEach((doc) => {
        tmp.push({ ...doc.data(), id: doc.id });
      });
      comments = [...tmp];
    });
  }

  async function likeHandler() {
    const ref = doc(db, "posts", postID);
    if (!likes.includes($globalUser.uid)) {
      likes = [...likes, $globalUser.uid];
    } else {
      let index = likes.findIndex((item) => item === $globalUser.uid);
      likes.splice(index, 1);
    }
    await updateDoc(ref, {
      likes,
    });
  }

  async function addComment() {
    const commentObject = {
      content: comment,
      authorName: $globalUser.displayName,
      authorAvatar: $globalUser.photoURL,
      created: moment().utc().unix(),
      postID,
    };
    await addDoc(collection(db, "comments"), commentObject);
    comment = "";
    const ref = doc(db, "posts", postID);
    await updateDoc(ref, {
      comments: comments.length,
    });
  }
</script>

{#if post}
  <div>
    <h1 class="text-xl font-bold flex gap-2 items-center">
      {post.title}
    </h1>
    <div class="divider" />
    <div class="flex gap-4 items-center">
      <figure>
        <img
          src={post.authorAvatar}
          alt={post.authorName}
          class="h-20 mx-2 rounded-full ring-2 ring-primary"
        />
      </figure>
      <div class="">
        <h3 class="font-bold text-primary -my-2">{post.authorName}</h3>
        <h4 class="font-medium opacity-70 italic">
          posted at:
          {moment(post.created * 1000).fromNow()}
        </h4>
        <div class="mt-2 flex gap-3">
          <button
            class="text-base-content flex items-center gap-1 font-medium"
            on:click={likeHandler}
          >
            <div class="relative w-6 h-6">
              {#if !likedByCurrent}
                <span
                  class="material-icons-round absolute top-0 left-0"
                  in:fly={{ y: -20, duration: 250 }}
                  out:fly={{ y: 20, duration: 250 }}
                >
                  favorite_border
                </span>
              {:else}
                <span
                  class="material-icons-round text-red-500 absolute top-0 left-0"
                  in:fly={{ y: -20, duration: 250 }}
                  out:fly={{ y: 20, duration: 250 }}
                >
                  favorite
                </span>
              {/if}
            </div>
            <span>{likes.length}</span>
          </button>
          <div class="flex items-center gap-1 font-medium">
            <span class="material-icons-outlined"> mode_comment </span>
            {comments.length}
          </div>
        </div>
      </div>
    </div>
    <div class="divider" />
    <p>{post.content}</p>
    <div class="divider" />
    {#if $globalUser}
      <div class="flex items-start gap-3">
        <textarea
          class="textarea textarea-bordered w-72"
          placeholder="Leave a comment..."
          bind:value={comment}
        />
        <button class="btn" on:click={addComment} disabled={comment.length < 2}>
          Submit
        </button>
      </div>
      <div class="divider" />
    {/if}
    {#each comments as c}
      <div class="flex gap-2 items-start mb-4">
        <figure>
          <img
            src={c.authorAvatar}
            alt={c.authorName}
            class="h-10 mx-2 rounded-full ring-2 ring-primary"
          />
        </figure>
        <div>
          <div class="flex items-start gap-2">
            <h3 class="font-bold text-primary">{c.authorName}</h3>
            <h4 class="font-medium opacity-70 italic">
              (posted {moment(c.created * 1000).fromNow()})
            </h4>
          </div>
          <p>{c.content}</p>
        </div>
      </div>
    {/each}
  </div>
{/if}
