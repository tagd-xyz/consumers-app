<template>
  <q-page-container class="q-px-sm">
    <div v-if="isLoading" class="flex flex-center">
      <q-spinner color="primary" size="1.5rem" />
    </div>
    <p class="flex flex-center" v-else-if="0 == listCount">
      There are no items
    </p>
    <div v-else>
      <p class="text-body2 text-bold">{{ listCount }}</p>
      <q-card
        v-for="tagd in tagds"
        :key="tagd.id"
        flat
        @click="onTagdClicked(tagd)"
      >
        <q-card-section horizontal>
          <q-card-section class="col-4 flex flex-center no-margin no-padding">
            <q-img
              v-if="tagd.item.images.length > 0"
              class="rounded-borders"
              :src="tagd.item.images[0].thumbnail"
            />
            <div v-else>No images</div>
            <q-icon
              name="sell"
              class="absolute-top-left circle-icon bg-positive"
              size="xs"
              color="white"
              v-if="tagd.isAvailableForResale && !tagd.auctions"
            />
            <q-icon
              name="sell"
              class="absolute-top-left circle-icon bg-available"
              size="xs"
              color="white"
              v-if="tagd.auctions"
            />
          </q-card-section>
          <q-card-section>
            <div class="text-caption">{{ tagd.item.name }}</div>
            <div
              class="text-subtitle2 description min-height"
              v-html="
                tagd.item.description.replace(/(?:\r\n|\r|\n)/g, '<br />')
              "
            ></div>
            <div class="text-caption text-bold q-mt-sm">{{ tagd.slug }}</div>
            <div class="text-caption">
              {{ Object.values(tagd.item.properties).join(' / ') }}
            </div>
          </q-card-section>
        </q-card-section>
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

<style scoped>
.min-height {
  min-height: 4rem;
}
.description {
  display: -webkit-box;
  max-width: 200px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.circle-icon {
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
  text-align: center;
  line-height: 0.1rem;
  vertical-align: middle;
  padding: 15px;
  margin-top: 2rem;
  margin-left: 0.5rem;
}
</style>
