<template>
  <q-page class="flex flex-center row">
    <logo-component class="q-ma-lg" v-if="!isKeyboardVisible" />
    <div id="firebaseui-auth-container"></div>
    <debug-info class="fixed-top-right" v-if="isDebugEnabled" />
  </q-page>
</template>

<script setup>
import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css';
import { computed, onMounted, ref } from 'vue';
import { auth, authUI } from 'boot/firebase';
import { useRouter } from 'vue-router';
import LogoComponent from 'components/LogoComponent.vue';
import DebugInfo from './components/DebugInfo.vue';
import { Plugins } from 'app/src-capacitor/node_modules/@capacitor/core';

const { Keyboard } = Plugins;

const router = useRouter();

const isKeyboardVisible = ref(false);

const isDebugEnabled = computed(() => {
  return process.env.DEBUG_ENABLED ?? false;
});

Keyboard.addListener('keyboardDidShow', () => {
  isKeyboardVisible.value = true;
});

Keyboard.addListener('keyboardDidHide', () => {
  isKeyboardVisible.value = false;
});

onMounted(() => {
  const config = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/splash',
    callbacks: {
      signInSuccessWithAuthResult() {
        return true;
      },
    },
  };

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // user is logged in, redirect
      router.push({ name: 'splash' });
    } else {
      // user is logged out, start FirebaseUI
      auth.tenantId = process.env.FIREBASE_TENANT_ID;
      authUI.start('#firebaseui-auth-container', config);
    }
  });
});
</script>
