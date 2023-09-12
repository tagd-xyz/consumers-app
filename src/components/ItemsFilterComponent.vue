<template>
  <div class="q-ma-md">
    <h6>Filters</h6>
    <q-select
      v-model="order"
      :options="orderOptions"
      label="Sort by"
      @update:model-value="onOrderChange()"
      options-dense
    />
    <q-select
      v-model="type"
      :options="typeOptions"
      multiple
      label="Filter by Category"
      @update:model-value="onTypeChange()"
      :disable="!typeOptions.length"
      options-dense
    />
    <q-select
      v-model="retailer"
      :options="retailerOptions"
      multiple
      label="Filter by Retailer"
      @update:model-value="onRetailerChange()"
      options-dense
    />
    <q-select
      v-model="brand"
      :options="brandOptions"
      multiple
      label="Filter by Brand"
      @update:model-value="onBrandChange()"
      options-dense
    />
    <q-separator class="q-my-lg" />

    <div class="text-subtitle2">Available for resale</div>
    <q-option-group
      v-model="currentlyAvailable"
      :options="resaleOptions"
      @update:model-value="onAvailableChange()"
      inline
      dense
    />

    <div class="text-subtitle2 q-mt-md disabled">Listed for resale</div>
    <q-option-group
      v-model="currentlyListed"
      :options="resaleOptions"
      @update:model-value="onListedChange()"
      inline
      dense
    />

    <!-- <q-separator class="q-my-lg" />

    <q-btn color="primary" class="full-width q-my-sm" label="Apply" />
    <q-btn color="grey" class="full-width" label="Cancel" /> -->
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useTagdsStore } from 'stores/tagds';
import { useUiStore } from 'stores/ui';

const tagdsStore = useTagdsStore();
const uiStore = useUiStore();

const orderOptions = computed(() => {
  const options = uiStore.filtering.order.options;
  return Object.keys(options).map(function (key) {
    return options[key];
  });
});

const resaleOptions = computed(() => {
  const options = uiStore.filtering.resale.options;
  return Object.keys(options).map(function (key) {
    return {
      label: key,
      value: options[key],
    };
  });
});

const retailerOptions = computed(() => {
  return uiStore.filtering.retailer.options;
});

const retailersAvailable = computed(() => {
  return tagdsStore.retailers;
});

const brandOptions = computed(() => {
  return uiStore.filtering.brand.options;
});

const brandsAvailable = computed(() => {
  return tagdsStore.brands;
});

const typeOptions = computed(() => {
  return uiStore.filtering.type.options;
});

const typesAvailable = computed(() => {
  return tagdsStore.types;
});

const order = ref(uiStore.filtering.order.selected);
const type = ref(uiStore.filtering.type.selected);
const retailer = ref(uiStore.filtering.retailer.selected);
const brand = ref(uiStore.filtering.brand.selected);
const currentlyListed = ref(uiStore.filtering.resale.listed);
const currentlyAvailable = ref(uiStore.filtering.resale.available);

onMounted(() => {
  tagdsStore.fetchAll();
});

function onOrderChange() {
  uiStore.setFilteringOrder(order.value);
}

function onTypeChange() {
  uiStore.setFilteringType(type.value);
}

function onRetailerChange() {
  uiStore.setFilteringRetailer(retailer.value);
}

function onBrandChange() {
  uiStore.setFilteringBrand(brand.value);
}

function onAvailableChange() {
  uiStore.setFilteringResaleAvailable(currentlyAvailable.value);
}

function onListedChange() {
  uiStore.setFilteringResaleListed(currentlyListed.value);
}

watch(retailersAvailable, () => {
  uiStore.setFilteringRetailerOptions(retailersAvailable.value);
  retailer.value = retailersAvailable.value;
});

watch(brandsAvailable, () => {
  uiStore.setFilteringBrandOptions(brandsAvailable.value);
  brand.value = brandsAvailable.value;
});

watch(typesAvailable, () => {
  uiStore.setFilteringTypeOptions(
    typesAvailable.value.map((type) => {
    return {
      label: type.name,
      value: type.id,
    };
  }));
  type.value = typesAvailable.value.map((type) => {
    return {
      label: type.name,
      value: type.id,
    };
  });
});
</script>

<style scoped></style>
