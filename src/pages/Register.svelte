<script>
  import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
  } from "firebase/auth";
  import { Link, useNavigate } from "svelte-navigator";
  const navigate = useNavigate();
  const mailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let passVisible = false;
  let confirmVisible = false;
  const togglePassVisible = () => {
    passVisible = !passVisible;
  };
  const toggleConfirmVisible = () => {
    confirmVisible = !confirmVisible;
  };
  let name = "";
  let email = "";
  let password = "";
  let confirm = "";

  // firebase
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const signupGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      navigate("/");
    });
  };

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      updateProfile(result.user, {
        displayName: name,
      }).then(() => navigate("/"));
    });
  };
</script>

<div class="flex flex-col gap-6 w-full items-center">
  <h1 class="font-bold text-lg">Sign Up</h1>
  <div>
    <button class="btn btn-outline" on:click={signupGoogle}>
      w / Google
    </button>
  </div>
  <div class="divider my-1">OR</div>
  <form class="w-full flex flex-col gap-4" on:submit|preventDefault={signup}>
    <label class="block relative">
      <span
        class="material-icons-round opacity-40 absolute text-xl w-12 h-12 flex items-center justify-center"
      >
        face
      </span>
      <input
        type="text"
        placeholder="Your Name"
        bind:value={name}
        class="input input-bordered w-full pl-10"
      />
    </label>
    <label class="block relative">
      <span
        class="material-icons-round opacity-40 absolute text-xl w-12 h-12 flex items-center justify-center"
      >
        email
      </span>
      <input
        type="email"
        bind:value={email}
        placeholder="Your Email"
        class="input input-bordered w-full pl-10"
      />
    </label>
    <label class="block relative">
      <span
        class="material-icons-round opacity-40 absolute text-xl w-12 h-12 flex items-center justify-center"
      >
        vpn_key
      </span>
      <input
        type={passVisible ? "text" : "password"}
        placeholder="Your Password"
        class="input input-bordered w-full pl-10"
        value={password}
        on:input={(e) => {
          // @ts-ignore
          password = e.target.value;
        }}
      />
      <button type="button" on:click={togglePassVisible}>
        {#if passVisible}
          <span
            class="material-icons-round opacity-40 absolute text-xl w-12 h-12 flex items-center justify-center top-0 right-0"
          >
            visibility_off
          </span>
        {:else}
          <span
            class="material-icons-round opacity-40 absolute text-xl w-12 h-12 flex items-center justify-center top-0 right-0"
          >
            visibility
          </span>
        {/if}
      </button>
    </label>
    <label class="block relative">
      <span
        class="material-icons-round opacity-40 absolute text-xl w-12 h-12 flex items-center justify-center"
      >
        vpn_key
      </span>
      <input
        type={confirmVisible ? "text" : "password"}
        placeholder="Confirm Password"
        class="input input-bordered w-full pl-10"
        value={confirm}
        on:input={(e) => {
          // @ts-ignore
          confirm = e.target.value;
        }}
      />
      <button type="button" on:click={toggleConfirmVisible}>
        {#if confirmVisible}
          <span
            class="material-icons-round opacity-40 absolute text-xl w-12 h-12 flex items-center justify-center top-0 right-0"
          >
            visibility_off
          </span>
        {:else}
          <span
            class="material-icons-round opacity-40 absolute text-xl w-12 h-12 flex items-center justify-center top-0 right-0"
          >
            visibility
          </span>
        {/if}
      </button>
    </label>
    <button
      type="submit"
      class="btn btn-primary gap-2"
      disabled={name.length === 0 ||
        !mailRegExp.test(email) ||
        password.length < 6 ||
        password !== confirm}
    >
      <span class="material-icons-round text-xl"> person_add_alt_1 </span>
      Register
    </button>
  </form>
  <div class="divider mb-0" />
  <div>
    Have the account?
    <Link to="/login">Sign in</Link>
  </div>
</div>
