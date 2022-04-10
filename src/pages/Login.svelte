<script>
  import { notification } from "../store";
  import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { Link, useNavigate } from "svelte-navigator";
  const navigate = useNavigate();
  const mailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let passVisible = false;
  const togglePassVisible = () => {
    passVisible = !passVisible;
  };
  let email = "";
  let password = "";

  // firebase
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const signinGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      notification.set({
        type: "success",
        message: "Success login! Welcome!",
      });
      navigate("/");
    });
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password).then((result) => {
      navigate("/");
    });
  };
</script>

<div class="flex flex-col gap-6 w-full items-center">
  <h1 class="font-bold text-lg">Sign Up</h1>
  <div>
    <button class="btn btn-outline" on:click={signinGoogle}>
      w / Google
    </button>
  </div>
  <div class="divider my-1">OR</div>
  <form class="w-full flex flex-col gap-4" on:submit|preventDefault={signIn}>
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
    <button
      type="submit"
      class="btn btn-primary gap-2"
      disabled={!mailRegExp.test(email) || password.length < 6}
    >
      <span class="material-icons-round text-xl"> person_add_alt_1 </span>
      Login
    </button>
  </form>
  <div class="divider mb-0" />
  <div>
    Don't have an account?
    <Link to="/register">Sign Up</Link>
  </div>
</div>
