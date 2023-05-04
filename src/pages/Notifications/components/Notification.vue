<template>
  <NotificationTagCreated
    v-if="isTagCreatedType"
    :notification="notification"
    class="fit"
    @click="onClick(notification)"
  />
  <NotificationAccessRequested
    v-if="isAccessRequestedType"
    :notification="notification"
    class="fit"
    @click="onClick(notification)"
  />
</template>

<script setup>
import NotificationTagCreated from './NotificationTagCreated.vue';
import NotificationAccessRequested from './NotificationAccessRequested.vue';
import { computed } from 'vue';

const emit = defineEmits(['read']);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  notification: {
    type: Object,
  },
});

const isTagCreatedType = computed(() => {
  return (
    'Tagd\\Core\\Notifications\\Consumers\\TagdCreated' ==
    props.notification.type
  );
});

const isAccessRequestedType = computed(() => {
  return (
    'Tagd\\Core\\Notifications\\Consumers\\AccessRequested' ==
    props.notification.type
  );
});

function onClick(notification) {
  emit('read', notification);
}
</script>
