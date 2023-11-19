import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgNOAOeyaymADg-WkhyC7AiFH5Y2fUTUc",
  authDomain: "edgarm-36c1f.firebaseapp.com",
  projectId: "edgarm-36c1f",
  storageBucket: "edgarm-36c1f.appspot.com",
  messagingSenderId: "545469888386",
  appId: "1:545469888386:web:37c1156bf520590cde419b",
  measurementId: "G-JS78SDD9PW",
};

const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();