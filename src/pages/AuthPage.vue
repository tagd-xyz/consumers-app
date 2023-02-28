<template>
  <q-page class="flex flex-center">
    <div id="firebaseui-auth-container"></div>
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
  </q-page>
</template>

<script setup>
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { ref, onMounted } from "vue";
import { useAuthStore } from '../stores/auth';

const store = useAuthStore();

const firebaseConfig = {
  apiKey: "AIzaSyCsKvxjZAIy-f74HK7vscaTdVjjBj9utrQ",
  authDomain: "tagd-fc027.firebaseapp.com",
  projectId: "tagd-fc027",
  storageBucket: "tagd-fc027.appspot.com",
  messagingSenderId: "758413626037",
  appId: "1:758413626037:web:32461658697e12aafd0cfc",
  measurementId: "G-E0NX4GB2MY",
};

firebase.initializeApp(firebaseConfig);

onMounted(() => {
  const config = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: "/items",
    callbacks: {
      signInSuccessWithAuthResult(authResult) {
        store.signIn(authResult.user);
        // console.log(authResult.user);
        // user.value = authResult.user.displayName;
        // console.log(authResult);
        // isSignedIn.value = true;
        // console.log("Signed in by user " + user.value);
        return true;
      },
    },
  };

  const ui =
    firebaseui.auth.AuthUI.getInstance() ||
    new firebaseui.auth.AuthUI(firebase.auth());

  ui.start("#firebaseui-auth-container", config);
});
</script>
