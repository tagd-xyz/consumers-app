<template>
  <q-layout view="hHr lpr fFr">
    <router-view />
    <q-footer bordered class="bg-white text-black">
      <q-tabs
        align="center"
        indicator-color="transparent"
        active-color="primary"
      >
        <q-route-tab no-caps to="/items" icon="sell" label="Your Tags" />
        <q-route-tab
          no-caps
          to="/notifications"
          icon="notifications"
          label="Notifications"
        />
        <q-route-tab
          no-caps
          to="/account"
          icon="account_circle"
          label="Account"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
export default {};
</script>

<style>
/* .q-footer .q-tab__label {
  text-transform: none !important;
} */
</style>

<!-- <script setup>
import { computed, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { auth } from "boot/firebase";

const store = useAuthStore();

console.log("PINIA USER", store.user);

const leftDrawerOpen = ref(false);

const currentUser = computed(() => {
  return store.user.displayName;
});

function onSignOutClicked() {
  auth.signOut().then(() => {
    store.signOut();
    window.location.href = "/auth";
  });
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script> -->
