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
import { computed } from 'vue';

const list = computed(() => {
  return [
    {
      id: '1',
      title: 'You have received a new tag!',
      tagd: {
        slug: 'ads-das-das-asa',
        item: {
          name: 'Small Classic Handbag',
          retailer: 'Retailer name',
        },
      },
    },
    {
      id: '2',
      title: 'You have received a new tag!',
      tagd: {
        slug: 'ads-das-das-asa',
        item: {
          name: 'Small Classic Handbag',
          retailer: 'Retailer name',
        },
      },
    },
  ];
});
</script>
