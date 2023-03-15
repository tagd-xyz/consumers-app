<template>
  <div>
    <Header title="Your account" />

    <q-page-container class="q-ma-lg">
      <div v-if="store.data?.actors">
        <div class="row">
          <div class="col text-grey text-h6">Display Name</div>
          <div class="col text-h6">{{ store.data.actors[0].name }}</div>
        </div>
        <div class="row">
          <div class="col text-grey text-h6">Email</div>
          <div class="col text-h6">{{ store.data.email }}</div>
        </div>
      </div>

      <q-separator class="q-my-lg" color="grey" />

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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from 'boot/firebase';
import { useMeStore } from 'stores/me';
import Header from './components/Header.vue';

const router = useRouter();
const showDialog = ref(false);
const store = useMeStore();

function onSignOutClicked() {
  auth.signOut().then(() => {
    router.push({ name: 'signIn' });
  });
}

onMounted(() => {
  store.fetch();
});
</script>
