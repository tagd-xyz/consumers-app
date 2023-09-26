<template>
  <div>
    <p class="text-h6">
      {{ tagd?.item.name }}
      <q-badge outline color="primary">
        {{ tagd?.status }}
      </q-badge>
    </p>
    <p>
      <span class="text-grey"> Digital ID</span>
      <span class="text-overline">{{ tagd?.slug }}</span>
    </p>
    <p v-html="tagd?.item.description.replace(/(?:\r\n|\r|\n)/g, '<br />')" />
    <div class="row">
      <div class="col">
        <p class="text-grey no-margin">Brand</p>
        <p>{{ tagd?.item.properties.brand ?? 'Unknown' }}</p>
      </div>
      <div class="col">
        <p class="text-grey no-margin">Category</p>
        <p>{{ tagd?.item.type?.name ?? 'Unknown' }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p class="text-grey no-margin">Size</p>
        <p>{{ tagd?.item.properties.size ?? 'Unknown' }}</p>
      </div>
      <div class="col">
        <p class="text-grey no-margin">Model</p>
        <p>{{ tagd?.item.properties.model ?? 'Unknown' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  tagd: {
    type: Object,
    required: true,
  },
});
</script>
