<template>
  <q-card flat>
    <q-card-section>
      <p class="text-subtitle2 no-margin">Reseller Request</p>
      <p class="text-h6 q-my-sm">
        {{ notification?.data?.title }}
      </p>
      <p class="text-negative" v-if="errorMessage">
        {{ errorMessage }}
      </p>
      <p v-if="isFetching">loading...</p>
      <p class="text-positive" v-if="isApproved">You accepted this request</p>
      <p class="text-negative" v-if="isRejected">You rejected this request</p>
      <p class="text-negative" v-if="isRevoked">You revoked this request</p>
    </q-card-section>

    <q-card-actions class="justify-start" v-if="areActionsEnabled">
      <q-input outlined dense v-model="code" label="Code" class="q-mr-sm" />
      <q-btn
        no-caps
        color="primary"
        :loading="isApproving"
        :disable="!isApproveEnabled"
        @click="onAccept"
        >Accept</q-btn
      >
      <q-btn
        no-caps
        color="negative"
        :loading="isRejecting"
        :disable="!isRejectEnabled"
        @click="onReject"
        >Reject</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

import { useAccessRequestsStore } from 'stores/accessRequests';
// import { useRouter } from 'vue-router';

// const router = useRouter();

const accessRequestsStore = useAccessRequestsStore();

const code = ref('');
const errorMessage = ref(null);
const accessRequest = ref(null);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  notification: {
    type: Object,
  },
});

const accessRequestId = computed(() => {
  return props.notification?.data?.accessRequestId;
});

const isApproved = computed(() => {
  return accessRequest.value?.isApproved;
});

const isPending = computed(() => {
  return accessRequest.value?.isPending;
});

const isRejected = computed(() => {
  return accessRequest.value?.isRejected;
});

const isRevoked = computed(() => {
  return accessRequest.value?.isRevoked;
});

const areActionsEnabled = computed(() => {
  return !isFetching.value && isPending.value;
});

const isApproveEnabled = computed(() => {
  return !isApproving.value && !isRejecting.value && 8 == code.value.length;
});

const isRejectEnabled = computed(() => {
  return !isApproving.value && !isRejecting.value;
});

const isFetching = computed(() => {
  return accessRequestsStore.is.fetching;
});

const isApproving = computed(() => {
  return accessRequestsStore.is.approving;
});

const isRejecting = computed(() => {
  return accessRequestsStore.is.rejecting;
});

function setErrorMessage(message) {
  errorMessage.value = message;
  setTimeout(() => {
    errorMessage.value = null;
  }, 5000);
}

function onReject() {
  accessRequestsStore
    .reject(accessRequestId.value)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      setErrorMessage('Something went wrong.');
      console.log(error);
    })
    .finally(() => {
      fetchAccessRequest();
    });
}

function onAccept() {
  accessRequestsStore
    .approve(accessRequestId.value, code.value)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      setErrorMessage('Something went wrong.');
      console.log(error);
    })
    .finally(() => {
      fetchAccessRequest();
    });
}

function fetchAccessRequest() {
  accessRequestsStore
    .fetch(accessRequestId.value)
    .then((response) => {
      accessRequest.value = response.data.data;
    })
    .catch(() => {
      accessRequest.value = null;
    });
}

onMounted(() => {
  fetchAccessRequest();
});
</script>
