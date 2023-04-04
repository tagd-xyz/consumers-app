<template>
  <div>
    <div v-if="isActive">
      <SellEnable v-if="!isAvailableForResale" :tagd="tagd" />
      <SellEnabled v-if="isAvailableForResale && !hasAuctions" :tagd="tagd" />
      <SellTransfer v-if="isAvailableForResale && !hasAuctions" :tagd="tagd" />
      <SellAuctions
        v-if="isAvailableForResale && hasAuctions"
        :auctions="tagd.auctions"
      />
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

const isAvailableForResale = computed(() => {
  return props.tagd.isAvailableForResale;
});

const hasAuctions = computed(() => {
  return props.tagd.auctions?.length;
});
</script>
