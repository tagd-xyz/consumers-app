<template>
  <div>
    <Header title="Your account" />

    <q-page-container class="q-pa-lg">
      <div class="row">
        <div class="col">
          <q-btn
            no-caps
            outline
            label="Sign Out"
            size="lg"
            text-align="center"
            class="full-width"
            @click="showDialog = true"
          />
        </div>
      </div>
    </q-page-container>

    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Do you want to sign out?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn
            flat
            label="Yes, sign out"
            color="primary"
            v-close-popup
            @click="onSignOutClicked"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from 'boot/firebase';
import Header from './components/Header.vue';

const router = useRouter();
const showDialog = ref(false);

function onSignOutClicked() {
  auth.signOut().then(() => {
    router.push({ name: 'signIn' });
  });
}
</script>
