// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ2AmMwI0scBLwtF6NEUTOctpXSQs9xSE",
  authDomain: "f12-fire.firebaseapp.com",
  projectId: "f12-fire",
  storageBucket: "f12-fire.appspot.com",
  messagingSenderId: "342141445637",
  appId: "1:342141445637:web:f5bbf7d18a3df007289e6c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
