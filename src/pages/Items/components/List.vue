<template>
  <q-page-container class="q-pa-md q-ma-md">
    <div v-if="isLoading" class="flex flex-center">
      <q-spinner color="primary" size="1.5rem" />
    </div>
    <p class="flex flex-center" v-else-if="0 == listCount">
      There are no items
    </p>
    <div v-else>
      <p class="text-caption">{{ listCount }}</p>
      <q-card
        v-for="item in items"
        :key="item.id"
        class="my-card"
        flat
        bordered
      >
        <q-card-section horizontal>
          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="https://picsum.photos/seed/picsum/200/300"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div class="text-caption text-grey">{{ item.description }}</div>
            <div class="text-subtitle1">{{ item.retailer }}</div>
            <div class="text-subtitle2">
              {{ Object.values(item.properties).join(' / ') }}
            </div>
          </q-card-section>
        </q-card-section>

        <q-separator />
      </q-card>
    </div>
  </q-page-container>
</template>

<script setup>
import { computed } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: [],
  },
});

const listCount = computed(() => {
  const count = props.items.length;
  return 1 == count ? `${count} result` : `${count} results`;
});
</script>
