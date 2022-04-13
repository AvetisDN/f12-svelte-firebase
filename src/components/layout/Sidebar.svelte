<script>
  import { Link, useLocation } from "svelte-navigator";
  const location = useLocation();
</script>

<aside class="relative md:p-4">
  <div
    class="h-full w-12 bg-base-200 p-3 flex flex-col gap-2 items-center shadow-xl md:rounded-xl md:w-16 md:p-4 lg:min-w-[240px] lg:items-stretch"
  >
    <div class="flex text-primary-focus gap-2 font-bold text-lg items-center">
      <span class="material-icons-round"> view_in_ar </span>
      <span class="hidden lg:block">SvelteGram</span>
    </div>
    <div class="divider my-1 hidden lg:flex">
      <span class="material-icons-round text-base opacity-40"> menu </span>
    </div>
    <nav class="flex flex-col gap-2">
      <Link to="/">
        <div class="nav-link" class:active={$location.pathname === "/"}>
          <div class="nav-link__icon">
            <span class="material-icons-round"> home </span>
          </div>
          Home
        </div>
      </Link>
      <div class="divider my-1 hidden lg:flex">
        <span class="material-icons-round text-base opacity-40">
          account_box
        </span>
      </div>
      <Link to="/profile">
        <div class="nav-link" class:active={$location.pathname === "/profile"}>
          <div class="nav-link__icon">
            <span class="material-icons-round"> manage_accounts </span>
          </div>
          Profile
        </div>
      </Link>
      <Link to="/create">
        <div class="nav-link" class:active={$location.pathname === "/create"}>
          <div class="nav-link__icon">
            <span class="material-icons-round"> note_add </span>
          </div>
          Create post
        </div>
      </Link>
      <Link to="/posts">
        <div class="nav-link" class:active={$location.pathname === "/posts"}>
          <div class="nav-link__icon">
            <span class="material-icons-round"> view_list </span>
          </div>
          My Posts
        </div>
      </Link>
    </nav>
  </div>
</aside>
