<template>
  <div>
    <q-card flat :class="notification.isRead ? '' : 'bg-grey-2'">
      <q-card-section>
        <p class="text-subtitle2 no-margin">Reseller Request</p>
        <p class="text-subtitle1 text-bold no-margin">
          {{ notification?.data?.title }}
        </p>

        <p v-if="isFetching">loading...</p>
        <p class="text-positive" v-if="isApproved">You accepted this request</p>
        <p class="text-negative" v-if="isRejected">You rejected this request</p>
        <p class="text-negative" v-if="isRevoked">You revoked this request</p>
      </q-card-section>
      <q-card-actions v-if="areActionsEnabled">
        <q-btn
          no-caps
          color="primary"
          :loading="isRejecting"
          :disable="!isRejectEnabled"
          @click="showDialog = true"
          >Accept</q-btn
        >
        <q-btn
          no-caps
          outline
          :loading="isRejecting"
          :disable="!isRejectEnabled"
          @click="onReject"
          >Reject</q-btn
        >
      </q-card-actions>
    </q-card>
    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <q-card-section class="row items-center justify-center text-center">
          <!-- <div>Reseller Request</div> -->
          <span class="q-mx-lg text-h6">
            {{ reseller.name }} has requested to access your items
          </span>
        </q-card-section>
        <q-card-section class="row items-center justify-center text-center">
          <span class=""> Enter 6 digit code </span>
          <span class="text-negative" v-if="errorMessage && isCodeEmpty">
            {{ errorMessage }}
          </span>
        </q-card-section>

        <q-card-actions class="justify-center">
          <q-input
            square
            borderless
            v-model="code"
            mask="######"
            class="digits"
            item-aligned
            :disable="!isDigitsEnabled"
            bg-color="grey-3"
            placeholder=""
            input-style="text-align: center;letter-spacing:0.2em;"
          />
        </q-card-actions>

        <q-card-actions align="center">
          <q-btn
            v-if="isApproveEnabled || isApproving"
            no-caps
            class="full-width q-my-sm"
            label="Accept"
            color="primary"
            :loading="isApproving"
            @click="onAccept"
          />
          <q-btn
            v-if="!isApproveEnabled && !isApproving"
            flat
            no-caps
            v-close-popup
            class="full-width q-my-sm"
            label="Close"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

import { useAccessRequestStore } from 'src/stores/accessRequest';
// import { useRouter } from 'vue-router';

// const router = useRouter();

const accessRequestsStore = useAccessRequestStore();

const code = ref('');
const errorMessage = ref(null);
const accessRequest = ref(null);
const showDialog = ref(false);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  notification: {
    type: Object,
  },
});

const reseller = computed(() => {
  return props.notification?.data?.reseller;
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

const isDigitsEnabled = computed(() => {
  return !isApproving.value && !isRejecting.value;
});

const isCodeEmpty = computed(() => {
  return 0 == code.value.length;
});

const isApproveEnabled = computed(() => {
  return !isApproving.value && !isRejecting.value && code.value.length === 6;
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
    // errorMessage.value = null;
  }, 5000);
}

function onReject() {
  accessRequestsStore
    .reject(accessRequestId.value)
    .then(() => {})
    .catch(() => {
      setErrorMessage('Something went wrong.');
    })
    .finally(() => {
      fetchAccessRequest();
    });
}

function onAccept() {
  accessRequestsStore
    .approve(accessRequestId.value, code.value)
    .then(() => {
      showDialog.value = false;
    })
    .catch(() => {
      setErrorMessage('Please check the auth code with the reseller');
      code.value = '';
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

<style scoped>
.reseller-logo {
  max-width: 3rem;
}
.digits {
  font-size: xx-large;
  /* font-family: 'Courier New', Courier, monospace; */
  font-weight: bold;
  letter-spacing: 1em;
  width: 75%;
}
</style>
