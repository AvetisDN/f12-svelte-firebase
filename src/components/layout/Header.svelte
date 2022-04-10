<script>
  import { getAuth, signOut } from "firebase/auth";
  import { Link, useNavigate } from "svelte-navigator";
  import { globalUser, theme } from "../../store";

  const auth = getAuth();

  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  export const changeTheme = () => {
    theme.set($theme === "garden" ? "halloween" : "garden");
  };
</script>

<header class="flex justify-between items-center gap-4 flex-wrap">
  <div class="relative">
    <label
      class="material-icons-round flex items-center justify-center absolute w-12 h-12 text-primary cursor-pointer"
      for="search"
    >
      search
    </label>
    <input
      id="search"
      type="search"
      placeholder="Search something..."
      class="input input-bordered w-full max-w-xs pl-10"
    />
  </div>
  <div class="flex items-center text-base-100 gap-4">
    <h4 class="text-lg">
      Hello,
      <Link to="/profile" class="hover:text-base-100 hover:underline">
        {$globalUser ? $globalUser.displayName : "Guest"}
      </Link>
    </h4>
    {#if $globalUser}
      <button class="btn btn-error gap-2" on:click={logOut}>
        Log Out
        <span class="material-icons-round text-lg"> logout </span>
      </button>
    {:else}
      <Link to="/login" class="btn btn-success btn-sm gap-1">
        <span class="material-icons-round text-lg"> login </span>
        Login
      </Link>
      <Link to="/register" class="btn btn-error btn-sm gap-1">
        <span class="material-icons-round text-lg"> person_add </span>
        Register
      </Link>
    {/if}
    <label class="swap swap-rotate ml-2 btn btn-primary rounded-full w-12">
      <input type="checkbox" on:change={changeTheme} />
      <div class="swap-on">
        <span class="material-icons-round"> dark_mode </span>
      </div>
      <div class="swap-off">
        <span class=" material-icons-round"> light_mode </span>
      </div>
    </label>
  </div>
</header>
