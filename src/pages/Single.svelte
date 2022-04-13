<script>
  import { onMount } from "svelte";
  import { doc, getDoc } from "firebase/firestore";
  import { useParams } from "svelte-navigator";
  import { db } from "../firebase";
  import PostItem from "../components/PostItem.svelte";
  import moment from "moment";
  const params = useParams();
  $: postID = $params.id;

  let post = null;

  onMount(async () => {
    const docRef = doc(db, "posts", postID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      post = docSnap.data();
    } else {
      //error handling
    }
  });
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
      </div>
    </div>
    <div class="divider" />
    <p>{post.content}</p>
    <div class="divider" />
  </div>
{/if}
