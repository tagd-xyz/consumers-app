<template>
  <div>
    <q-header class="bg-white text-black q-pt-md" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="absolute-center text-subtitle2">
          {{ title }}
        </q-toolbar-title>
        <q-btn
          no-caps
          outline
          dense
          size="small"
          label="Clear"
          class="absolute-right q-ma-sm q-px-sm"
        />
      </q-toolbar>
    </q-header>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
});
</script>

<style scoped>
/* .q-header .q-btn-group .q-btn{
  text-transform: none !important;
} */
</style>
