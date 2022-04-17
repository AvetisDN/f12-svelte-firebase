<script>
  import { db } from "../firebase";
  import { globalUser, notification } from "../store";
  import { collection, addDoc } from "firebase/firestore";
  import moment from "moment";

  let title = "";
  let content = "";

  async function submitPost() {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        content,
        created: moment().utc().unix(),
        authorName: $globalUser.displayName,
        authorAvatar: $globalUser.photoURL,
        likes: [],
        comments: 0,
      });
      title = "";
      content = "";
      notification.set({
        type: "success",
        message: "Post added successfully",
      });
    } catch (error) {
      notification.set({
        type: "error",
        message: error.message,
      });
    }
  }
</script>

<div>
  <h1 class="text-xl font-bold flex gap-2 items-center">Create new post</h1>
  <div class="divider" />
  <form
    class="flex flex-col items-start gap-3"
    on:submit|preventDefault={submitPost}
  >
    <label class="flex gap-1">
      Title:
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs"
        bind:value={title}
        required
      />
    </label>
    <label class="flex items-start gap-1">
      Content:
      <textarea
        type="text"
        placeholder="Type here"
        class="textarea textarea-bordered w-full max-w-xs"
        bind:value={content}
        required
      />
    </label>
    <div class="divider" />
    <button class="btn btn-success gap-2" type="submit">
      <span class="material-icons-round text-lg"> save </span>
      Save
    </button>
  </form>
</div>
