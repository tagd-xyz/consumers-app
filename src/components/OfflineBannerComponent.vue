<template>
  <q-banner class="bg-info" v-if="show">
    <template v-slot:avatar>
      <q-icon name="signal_wifi_off" color="white" />
    </template>
    <div class="text-white">You have lost connection to the internet.</div>
  </q-banner>
</template>

<script setup>
import { useNetworkStore } from 'stores/network';
import { computed } from 'vue';

const store = useNetworkStore();

const show = computed(() => {
  return store.isNetworkDown;
});
</script>

<style scoped></style>
