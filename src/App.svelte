<script>
  import { Router, Route } from "svelte-navigator";
  import AuthLayout from "./components/AuthLayout.svelte";
  import Layout from "./components/Layout.svelte";
  import Notification from "./components/Notification.svelte";
  import PrivateLayout from "./components/PrivateLayout.svelte";
  import CreatePost from "./pages/CreatePost.svelte";
  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import Posts from "./pages/Posts.svelte";
  import Profile from "./pages/Profile.svelte";
  import Register from "./pages/Register.svelte";
  import Single from "./pages/Single.svelte";
</script>

<Router>
  <Route path="/">
    <Layout>
      <Home />
    </Layout>
  </Route>
  <Route path="/post/:id">
    <Layout>
      <Single />
    </Layout>
  </Route>
  <Route path="/posts">
    <PrivateLayout>
      <Posts />
    </PrivateLayout>
  </Route>
  <Route path="/profile">
    <PrivateLayout>
      <Profile />
    </PrivateLayout>
  </Route>
  <Route path="/create">
    <PrivateLayout>
      <CreatePost />
    </PrivateLayout>
  </Route>
  <Route path="/register">
    <AuthLayout>
      <Register />
    </AuthLayout>
  </Route>
  <Route path="/login">
    <AuthLayout>
      <Login />
    </AuthLayout>
  </Route>

  <Notification />
</Router>
