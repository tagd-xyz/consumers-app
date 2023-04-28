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
    </q-page-container>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Notification from './components/Notification.vue';
import { computed, onMounted } from 'vue';
import { useNotificationsStore } from 'stores/notifications';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const store = useNotificationsStore();

$q.loading.show({
  delay: 1000,
});

const list = computed(() => {
  return store.list;
});

onMounted(() => {
  store.fetchAll().finally(() => {
    $q.loading.hide();
  });
});
</script>
