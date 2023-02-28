import { boot } from 'quasar/wrappers'
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";

// TODO: User .env
const firebaseConfig = {
  apiKey: "AIzaSyCsKvxjZAIy-f74HK7vscaTdVjjBj9utrQ",
  authDomain: "tagd-fc027.firebaseapp.com",
  projectId: "tagd-fc027",
  storageBucket: "tagd-fc027.appspot.com",
  messagingSenderId: "758413626037",
  appId: "1:758413626037:web:32461658697e12aafd0cfc",
  measurementId: "G-E0NX4GB2MY",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

const authUI = new firebaseui.auth.AuthUI(auth);

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async (/* { app, router, ... } */) => {
//   // something to do
// })

export { auth, authUI };
