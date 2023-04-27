<template>
  <q-page-container class="q-px-sm">
    <div v-if="isLoading" class="flex flex-center">
      <q-spinner color="primary" size="1.5rem" />
    </div>
    <p class="flex flex-center" v-else-if="0 == listCount">
      There are no items
    </p>
    <div v-else>
      <p class="text-body2">{{ listCount }}</p>
      <q-card
        v-for="tagd in tagds"
        :key="tagd.id"
        class="my-card"
        flat
        bordered
        @click="onTagdClicked(tagd)"
      >
        <q-card-section horizontal>
          <q-card-section class="col-5 flex flex-center">
            <q-img
              v-if="tagd.item.images.length > 0"
              class="rounded-borders"
              :src="tagd.item.images[0].thumbnail"
            />
            <div v-else>No images</div>
          </q-card-section>
          <q-card-section class="">
            <div class="text-caption text-grey">
              {{ tagd.item.description.replace(/(?:\r\n|\r|\n)/g, '<br />') }}
            </div>
            <div class="text-subtitle1">
              {{ tagd.item.retailer }}
            </div>
            <div class="text-subtitle2">
              {{ Object.values(tagd.item.properties).join(' / ') }}
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
  tagds: {
    type: Array,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: [],
  },
});

const emit = defineEmits(['tagdClick']);

const listCount = computed(() => {
  const count = props.tagds.length;
  return 1 == count ? `${count} result` : `${count} results`;
});

function onTagdClicked(item) {
  emit('tagdClick', item);
}
</script>
