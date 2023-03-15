<template>
  <div>
    <div v-if="isActive">
      <SellEnable v-if="showEnable" :tagd="tagd" />
      <SellEnabled v-if="showEnabled" :tagd="tagd" />
      <SellTransfer v-if="showEnabled" :tagd="tagd" />
      <SellAuctions v-if="false" :tagd="tagd" />
    </div>
    <div v-else>
      <p class="text-h6 no-margin">This item is not available to sell</p>
      <p></p>
    </div>
  </div>
</template>

<script setup>
import SellEnable from './TabSellEnable.vue';
import SellEnabled from './TabSellEnabled.vue';
import SellTransfer from './TabSellTransfer.vue';
import SellAuctions from './TabSellAuctions.vue';
import { computed } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  tagd: {
    type: Object,
    required: true,
  },
});

const isActive = computed(() => {
  return 'active' == props.tagd.status;
});

const showEnable = computed(() => {
  return !props.tagd.isAvailableForResale;
});

const showEnabled = computed(() => {
  return props.tagd.isAvailableForResale;
});
</script>
