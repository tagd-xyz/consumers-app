<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      swipeable
      :thumbnails="isFullscreen"
      :navigation="!isFullscreen"
      :fullscreen="isFullscreen"
      class="rounded-borders items-gallery"
      height="20rem"
    >
      <q-carousel-slide
        v-for="image in images"
        :key="image.id"
        :name="image.id"
        class="column no-wrap flex-center"
        :img-src="image.square"
        @click="toggleFullscreen"
      >
        <q-badge
          rounded
          class="absolute-top-right q-ma-md q-pa-sm"
          v-if="!isFullscreen"
          >Listed for resale</q-badge
        >
      </q-carousel-slide>
    </q-carousel>

    <div class="row justify-center q-mt-sm" v-if="false">
      <q-btn-toggle v-model="slide" :options="options" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const slide = ref(null);
const isFullscreen = ref(false);

const options = computed(() => {
  return props.images.map((image, index) => {
    return {
      label: index + 1,
      value: image.id,
    };
  });
});

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value;
}

onMounted(() => {
  if (props.images.length > 0) {
    slide.value = 1;
  }
});
</script>

<style scoped>
.items-gallery {
  /* max-height: 15rem; */
}
</style>
