<template>
  <q-card flat @click="onClick">
    <q-card-section>
      <p class="text-subtitle2 no-margin">
        {{ notification?.data?.title }}
      </p>
      <p class="text-h6 q-my-sm">
        {{ notification?.data?.tagd?.item?.name }}
      </p>
      <p class="text-subtitle2 no-margin">
        <span class="text-grey">Tag </span>
        {{ notification?.data?.tagd?.slug }}
      </p>
      <p class="text-subtitle2 no-margin">
        <span class="text-grey">from </span>
        <span class="text-primary">
          {{ notification?.data?.tagd?.item?.retailer?.name }}
        </span>
      </p>
    </q-card-section>

    <!-- <q-card-actions class="justify-start">
      <q-btn bordered no-caps color="primary">Accept</q-btn>
      <q-btn bordered no-caps>Cancel</q-btn>
    </q-card-actions> -->
  </q-card>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  notification: {
    type: Object,
  },
});

function onClick() {
  router.push({
    name: 'tagd',
    params: {
      id: props.notification.data.tagd.id,
    },
  });
}
</script>
