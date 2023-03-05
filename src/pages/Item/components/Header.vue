<template>
  <q-toolbar class="text-primary">
    <q-btn
      flat
      round
      dense
      icon="navigate_before"
      label="Back"
      no-caps
      @click="onBackClicked"
    />
    <q-toolbar-title class="absolute-center text-h6">
      Product details
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup>
const emit = defineEmits(['backClicked']);

function onBackClicked() {
  emit('backClicked');
}
</script>
