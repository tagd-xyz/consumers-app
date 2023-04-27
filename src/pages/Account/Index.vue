<template>
  <div>
    <Header title="Your account" />

    <q-page-container class="q-ma-lg">
      <div class="text-subtitle1 text-bold">Account details</div>
      <div v-if="isFetching" class="text-center">
        <q-spinner color="primary" size="3em" class="q-ma-lg" />
      </div>
      <div v-else>
        <q-card flat>
          <q-card-section v-if="meStore.data?.actors">
            Display name: {{ meStore.data?.actors[0].name ?? '' }}
            <br />
            Email: {{ meStore.data.email }}
          </q-card-section>
        </q-card>

        <div class="row">
          <div class="col">
            <q-btn
              no-caps
              outline
              color="primary"
              label="Sign Out"
              size="md"
              text-align="center"
              class="full-width q-my-sm"
              @click="showDialog = true"
            />
          </div>
        </div>
      </div>

      <div class="text-subtitle1 text-bold q-mt-lg">Approved Resellers</div>

      <div v-if="isFetchingAccessRequests" class="text-center">
        <q-spinner color="primary" size="3em" class="q-ma-lg" />
      </div>
      <div v-else>
        <div v-if="isAccessRequestsEmpty">
          <q-card flat>
            <q-card-section>
              You haven't approved any reseller access request.
            </q-card-section>
          </q-card>
        </div>
        <div v-else>
          <access-request
            v-for="accessRequest in accessRequests"
            :key="accessRequest.id"
            :accessRequest="accessRequest"
            @revoked="accessRequestsStore.fetch()"
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from 'boot/firebase';
import { useMeStore } from 'stores/me';
import { useAccessRequestsStore } from 'stores/accessRequests';
import Header from './components/Header.vue';
import AccessRequest from './components/AccessRequest.vue';

const router = useRouter();
const showDialog = ref(false);
const meStore = useMeStore();
const accessRequestsStore = useAccessRequestsStore();

function onSignOutClicked() {
  auth.signOut().then(() => {
    router.push({ name: 'signIn' });
  });
}

const isAccessRequestsEmpty = computed(() => {
  return 0 == accessRequests.value.length;
});

const isFetchingAccessRequests = computed(() => {
  return accessRequestsStore.is.fetching;
});

const accessRequests = computed(() => {
  return accessRequestsStore.list.filter((accessRequest) => {
    return accessRequest.isApproved;
  });
});

const isFetching = computed(() => {
  return meStore.is.fetching;
});

onMounted(() => {
  meStore.fetch();
  accessRequestsStore.fetch();
});
</script>
