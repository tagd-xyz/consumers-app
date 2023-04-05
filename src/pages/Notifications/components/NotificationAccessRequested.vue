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
      <q-input
        square
        outlined
        dense
        v-model="digits[0]"
        mask="#"
        class="digit q-pa-none q-pr-sm"
        ref="digit1"
        item-aligned
        :disable="!isDigitsEnabled"
        @update:model-value="onDigit1Change"
      />
      <q-input
        square
        outlined
        dense
        v-model="digits[1]"
        mask="#"
        class="digit q-pa-none q-pr-sm"
        ref="digit2"
        item-aligned
        :disable="!isDigitsEnabled"
        @update:model-value="onDigit2Change"
      />
      <q-input
        square
        outlined
        dense
        v-model="digits[2]"
        mask="#"
        class="digit q-pa-none q-pr-sm"
        ref="digit3"
        item-aligned
        :disable="!isDigitsEnabled"
        @update:model-value="onDigit3Change"
      />
      <q-input
        square
        outlined
        dense
        v-model="digits[3]"
        mask="#"
        class="digit q-pa-none q-pr-sm"
        ref="digit4"
        item-aligned
        :disable="!isDigitsEnabled"
        @update:model-value="onDigit4Change"
      />
      <q-input
        square
        outlined
        dense
        v-model="digits[4]"
        mask="#"
        class="digit q-pa-none q-pr-sm"
        ref="digit5"
        item-aligned
        :disable="!isDigitsEnabled"
      />
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

const digits = ref(['', '', '', '', '']);
const digit1 = ref(null);
const digit2 = ref(null);
const digit3 = ref(null);
const digit4 = ref(null);
const digit5 = ref(null);
const errorMessage = ref(null);
const accessRequest = ref(null);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  notification: {
    type: Object,
  },
});

const code = computed(() => {
  return digits.value.join('');
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

const isApproveEnabled = computed(() => {
  return (
    !isApproving.value &&
    !isRejecting.value &&
    digits.value.length == code.value.length
  );
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
      setErrorMessage('Please check the auth code with the reseller');
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

function onDigit1Change() {
  if (digits.value[0]) {
    digit2.value.focus();
  }
}

function onDigit2Change() {
  if (digits.value[1]) {
    digit3.value.focus();
  }
}

function onDigit3Change() {
  if (digits.value[2]) {
    digit4.value.focus();
  }
}

function onDigit4Change() {
  if (digits.value[3]) {
    digit5.value.focus();
  }
}

onMounted(() => {
  fetchAccessRequest();
});
</script>

<style scoped>
.digit {
  width: 2.5rem;
}
</style>
