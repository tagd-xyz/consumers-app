<template>
  <div>
    <q-card flat bordered>
      <q-card-section horizontal>
        <q-card-section class="col-5 flex flex-center">
          <q-img :src="accessRequest.reseller.logo" />
        </q-card-section>

        <q-card-section class="">
          <div class="text-bold">{{ accessRequest.reseller.name }}</div>
          <div>{{ accessRequest.approvedAt }}</div>
          <q-btn
            class="q-my-sm"
            size="md"
            color="secondary"
            @click="onRevokeClick"
            :loading="isRevoking"
          >
            Revoke
          </q-btn>
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm text-h6">Are you sure?</span>
        </q-card-section>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            The reseller won't be able to access your items.
            <br />
            Please note that on-going sales won't be affected.
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn
            flat
            label="Yes, revoke access"
            color="primary"
            v-close-popup
            @click="onConfirmClick"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAccessRequestStore } from 'stores/accessRequest';

const emit = defineEmits(['revoked']);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  accessRequest: {
    type: Object,
    required: true,
  },
});

const showDialog = ref(false);
const accessRequestStore = useAccessRequestStore();

const isRevoking = computed(() => {
  return accessRequestStore.is.rejecting;
});

function onRevokeClick() {
  showDialog.value = true;
}

function onConfirmClick() {
  showDialog.value = false;
  accessRequestStore.reject(props.accessRequest.id).then(() => {
    emit('revoked');
  });
  console.log('will revoke');
}
</script>
