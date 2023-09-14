<template>
  <div>
    <q-header class="bg-white text-black" height-hint="98">
      <offline-banner-component />
      <q-toolbar>
        <q-toolbar-title class="absolute-center text-subtitle2">
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
  </div>
</template>

<!-- <script>
export default {
  name: "HeaderComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
  },
};
</script> -->

<script setup>
import OfflineBannerComponent from 'components/OfflineBannerComponent.vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
});
</script>

<style scoped>
/* .q-header .q-btn-group .q-btn {
  text-transform: none !important;
} */
</style>
