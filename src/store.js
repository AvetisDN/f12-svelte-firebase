import { writable } from "svelte/store";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
// export const globalUser = writable(auth.currentUser);
export const globalUser = writable(
  localStorage.globalUser ? JSON.parse(localStorage.globalUser) : null
);

onAuthStateChanged(auth, (user) => {
  globalUser.set(user);
  if (user) {
    localStorage.globalUser = JSON.stringify(user);
  } else {
    localStorage.removeItem("globalUser");
  }
});

export const notification = writable(null);

export const theme = writable(
  localStorage.theme ? localStorage.theme : "garden"
);
theme.subscribe((value) => {
  document.documentElement.dataset.theme = value;
  localStorage.theme = value;
});
