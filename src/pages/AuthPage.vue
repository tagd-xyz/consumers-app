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
import "firebaseui/dist/firebaseui.css";
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { auth, authUI } from "boot/firebase";

const store = useAuthStore();

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
        return true;
      },
    },
  };

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // user is logged in, redirect
      const token = await user.getIdToken();
      store.signIn(user);
      store.setToken(token);
      window.location.href = "/items";
    } else {
      // user is logged out, start FirebaseUI
      store.signOut();
      store.setToken(false);
      authUI.start("#firebaseui-auth-container", config);
    }
  });
});
</script>
