<script>
  import { Link } from "svelte-navigator";
  import moment from "moment";
  export let post;
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
    <div class="card-actions justify-end">
      <Link
        to={`/post/${post.id}`}
        class="btn btn-primary hover:text-primary-content"
      >
        full post...
      </Link>
    </div>
  </div>
</div>
