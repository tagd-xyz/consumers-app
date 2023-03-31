<template>
  <div class="q-ma-md">
    <h6>Filters</h6>
    <q-select
      v-model="order"
      :options="orderOptions"
      label="Sort by"
      @update:model-value="onOrderChange()"
    />
    <q-select
      v-model="type"
      :options="typeOptions"
      multiple
      label="Category"
      @update:model-value="onTypeChange()"
    />
    <q-select
      v-model="retailer"
      :options="retailerOptions"
      multiple
      label="Retailer"
      @update:model-value="onRetailerChange()"
    />

    <q-separator class="q-my-lg" />

    <q-checkbox
      v-model="currentlyListed"
      label="Currently listed"
      @update:model-value="onListedChange()"
    />
    <q-checkbox
      v-model="currentlyAvailable"
      label="Currently available"
      @update:model-value="onAvailableChange()"
    />

    <!-- <q-separator class="q-my-lg" />

    <q-btn color="primary" class="full-width q-my-sm" label="Apply" />
    <q-btn color="grey" class="full-width" label="Cancel" /> -->
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useTagdsStore } from 'stores/tagds';
import { useUiStore } from 'stores/ui';

const tagdStore = useTagdsStore();
const uiStore = useUiStore();

// eslint-disable-next-line no-unused-vars
// const props = defineProps({
//   retailers: {
//     type: Array,
//     required: true,
//   },
// });

const orderOptions = computed(() => {
  return Object.keys(uiStore.filteringOrderOptions).map(function (key) {
    return uiStore.filteringOrderOptions[key];
  });
});

const typeOptions = computed(() => {
  return Object.keys(uiStore.filteringTypeOptions).map(function (key) {
    return uiStore.filteringTypeOptions[key];
  });
});

const retailerOptions = computed(() => {
  return uiStore.filteringRetailerOptions;
});

const retailers = computed(() => {
  return tagdStore.retailers;
});

const order = ref(uiStore.filtering.order);
const type = ref(uiStore.filtering.type);
const retailer = ref(null);
const currentlyListed = ref(true);
const currentlyAvailable = ref(true);

function onOrderChange() {
  uiStore.setFilteringOrder(order.value);
}

function onTypeChange() {
  uiStore.setFilteringType(type.value);
}

function onRetailerChange() {
  uiStore.setFilteringRetailer(retailer.value);
}

function onAvailableChange() {
  uiStore.setFilteringAvailable(currentlyAvailable.value);
}

function onListedChange() {
  uiStore.setFilteringListed(currentlyListed.value);
}

watch(retailers, () => {
  uiStore.setFilteringRetailersOptions(retailers.value);
  retailer.value = retailers.value;
});
</script>

<style scoped></style>
