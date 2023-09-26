<template>
  <div>
    <p class="text-h6 no-margin">Transfer your Digital ID</p>
    <p>
      Does this item now belong to someone else?
      <br />
      Transfer the TAGD ID here
    </p>
    <q-btn
      flat
      color="primary"
      class="full-width"
      label="Transfer Tag"
      @click="onClick"
    />
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

function onClick() {
  console.log('will transfer');
}
</script>
