<template>
  <div>
    <p class="text-h6 no-margin">Available for resale</p>
    <p>
      You have marked this item as available for resale. Selling partners will
      request to sell. Once you have approved this, your auctions will appear
      here.
    </p>
    <q-btn
      flat
      class="full-width"
      color="primary"
      label="Remove listing"
      :loading="isLoading"
      @click="onClicked"
    />
  </div>
</template>

<script setup>
import { useTagdStore } from 'stores/tagd';
import { computed } from 'vue';

const store = useTagdStore();

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  tagd: {
    type: Object,
    required: true,
  },
});

const isLoading = computed(() => {
  return store.is.enablingForResale;
});

const tagdId = computed(() => {
  return props.tagd.id;
});

function onClicked() {
  store.disableForResale(tagdId.value);
}
</script>
