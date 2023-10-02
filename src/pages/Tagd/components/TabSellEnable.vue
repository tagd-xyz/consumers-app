<template>
  <div>
    <p class="text-h6 no-margin">Sell this item</p>
    <p>
      To have this item listed by our partners, you must mark the item as
      available for resale.
    </p>
    <q-btn bordered class="full-width" color="primary" label="Available for resale" :loading="isLoading"
      @click="onClicked" />
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
  store.enableForResale(tagdId.value);
}
</script>
