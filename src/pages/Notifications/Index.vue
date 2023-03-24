<template>
  <div>
    <Header title="Notifications" />
    <q-page-container class="q-pa-md row q-gutter-md">
      <Notification
        v-for="notification in list"
        :key="notification.id"
        :notification="notification"
      >
      </Notification>
      <q-inner-loading :showing="store.is.fetching" />
    </q-page-container>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Notification from './components/Notification.vue';
import { computed, onMounted } from 'vue';
import { useNotificationsStore } from 'stores/notifications';

const store = useNotificationsStore();

const list = computed(() => {
  return store.list;
});

onMounted(() => {
  store.fetchAll();
});
</script>
