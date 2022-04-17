<script>
  import { Link } from "svelte-navigator";
  import moment from "moment";
  export let post;
  import { doc, updateDoc } from "firebase/firestore";
  import { db } from "../firebase";
  import { globalUser } from "../store";
  import { fly } from "svelte/transition";

  let likes = post.likes || [];
  $: likedByCurrent = $globalUser ? likes.includes($globalUser.uid) : false;

  async function likeHandler() {
    const ref = doc(db, "posts", post.id);
    if (!likes.includes($globalUser.uid)) {
      likes = [...likes, $globalUser.uid];
    } else {
      let index = likes.findIndex((item) => item === $globalUser.uid);
      likes.splice(index, 1);
      likes = [...likes];
    }
    await updateDoc(ref, {
      likes,
    });
  }
</script>

<div class="card card-compact card-side bg-base-100 shadow-xl">
  <figure>
    <img
      src={post.authorAvatar}
      alt={post.authorName}
      class="h-40 mx-2 rounded-full ring-2 ring-primary"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">{post.title}</h2>
    <h3 class="font-bold text-primary -my-2">{post.authorName}</h3>
    <h4 class="font-medium opacity-70 italic">
      posted at:
      {moment(post.created * 1000).fromNow()}
    </h4>
    <p>{post.content}</p>
    <div class="card-actions justify-between">
      <div class="mt-2 flex gap-3">
        <button
          class="text-base-content flex items-center gap-1 font-medium"
          on:click={likeHandler}
          disabled={!$globalUser}
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
          <span class="material-icons-outlined text-base"> mode_comment </span>
          {post.comments || 0}
        </div>
      </div>
      <Link
        to={`/post/${post.id}`}
        class="btn btn-primary hover:text-primary-content"
      >
        full post...
      </Link>
    </div>
  </div>
</div>
