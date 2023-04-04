<template>
  <div>
    <div class="row">
      <div class="col">
        <p class="text-grey no-margin">Item Code</p>
      </div>
      <div class="col">
        <p>{{ tagd.slug }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p class="text-grey no-margin">Item Status</p>
      </div>
      <div class="col">
        <p>{{ tagd.status }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p class="text-grey no-margin">Retailer</p>
      </div>
      <div class="col">
        <p>{{ tagd.item.retailer }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p class="text-grey no-margin">Purchase date</p>
      </div>
      <div class="col">
        <p>{{ tagd.createdAt }}</p>
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
