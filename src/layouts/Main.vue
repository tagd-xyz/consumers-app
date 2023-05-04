<template>
  <q-layout view="hHr lpr fFr">
    <router-view />
    <q-footer bordered class="bg-white text-black footer">
      <q-tabs
        align="center"
        indicator-color="transparent"
        active-color="primary"
        :breakpoint="0"
      >
        <q-route-tab no-caps to="/items" icon="sell" label="Your Tags" />
        <q-route-tab
          no-caps
          to="/notifications"
          icon="notifications"
          label="Notifications"
          class="q-mx-lg"
        >
          <q-badge
            class="q-mr-md q-mt-xs"
            color="negative"
            floating
            v-if="notificationsUnreadCount > 0"
          >
            {{ notificationsUnreadCount }}
          </q-badge>
        </q-route-tab>
        <q-route-tab
          no-caps
          to="/account"
          icon="account_circle"
          label="Account"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useNotificationsStore } from 'stores/notifications';
const notificationsStore = useNotificationsStore();
import { computed, onMounted } from 'vue';

const notificationsUnreadCount = computed(() => {
  return notificationsStore.list.filter((notification) => !notification.isRead)
    .length;
});

onMounted(() => {
  notificationsStore.fetchAll();
});
</script>

<style>
.q-tab__label {
  font-size: small;
}
.q-tab__icon {
  font-size: 2rem;
  margin-bottom: 0.3rem;
}
</style>
