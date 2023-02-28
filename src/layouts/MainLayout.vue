<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Tagd </q-toolbar-title>

        <div>demo v.0.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="400"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item exact to="/items" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section> Items </q-item-section>
          </q-item>

          <q-item exact to="/notifications" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="notifications" />
            </q-item-section>

            <q-item-section> Notifications </q-item-section>
          </q-item>

          <q-item exact to="/reseller-verification" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="domain_verification" />
            </q-item-section>

            <q-item-section> Reseller Verification </q-item-section>
          </q-item>

          <q-item exact to="/gift-tag" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="redeem" />
            </q-item-section>

            <q-item-section> Gift Tag </q-item-section>
          </q-item>

          <q-item exact to="/account" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section> Account </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div class="absolute-top bg-light-blue" style="height: 150px">
        <div class="absolute-center text-center">
          <q-avatar size="56px" class="q-mb-sm">
            <img
              src="https://es.gravatar.com/userimage/158710334/56ff754857db581bba7c20fc287d1ce9.jpeg"
            />
          </q-avatar>
          <div class="text-weight-bold">{{ currentUser ?? 'undefined' }}</div>
          <q-btn
            color="primary"
            size="xs"
            label="Sign out"
            @click="onSignOutClicked"
          />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from '../stores/auth';
import { auth } from "boot/firebase";

const store = useAuthStore();

console.log('PINIA USER', store.user);

const leftDrawerOpen = ref(false);

const currentUser = computed(() => {
  return store.user.displayName;
})

function onSignOutClicked() {
  auth.signOut().then(() => {
    store.signOut();
    window.location.href = '/auth';
  });
}

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

</script>
