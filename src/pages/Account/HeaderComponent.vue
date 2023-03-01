<template>
  <div>
    <q-header class="bg-white text-black" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          Your account
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
  const props = defineProps({
    title: String,
  });
</script>

<style scoped>
.q-header .q-btn-group .q-btn{
  text-transform: none !important;
}
</style>
