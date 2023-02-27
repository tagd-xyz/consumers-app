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

<script>
import { defineComponent } from "vue";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { ref } from "vue";

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

export default defineComponent({
  mounted() {
    console.log("---------------");
    const user = ref(null);
    const isSignedIn = ref(false);

    const config = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: "/items",
      callbacks: {
        signInSuccessWithAuthResult(authResult) {
          user.value = authResult.user.displayName;
          console.log(authResult);
          isSignedIn.value = true;
          console.log("Signed in by user " + user.value);
          return false;
        },
      },
    };

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());

    ui.start("#firebaseui-auth-container", config);

    return {
      user,
      isSignedIn,
    };
  },
});
</script>

<!-- https://github.com/macpatoOrigin/firebaseUI-Auth-vue2-quasar/blob/master/src/pages/auth/login.vue -->


const ui =
firebaseui.auth.AuthUI.getInstance() ||
new firebaseui.auth.AuthUI(this.$fire.auth);

const config = {
signInOptions: [
  this.$fireModule.auth.EmailAuthProvider.PROVIDER_ID,
  // this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
],
signInSuccessUrl: '/items',
callbacks: {
  signInSuccessWithAuthResult() {
    window.location = '/items';
  },
},
};
