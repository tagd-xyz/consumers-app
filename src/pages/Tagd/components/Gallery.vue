<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders items-gallery"
      height="15rem"
    >
      <q-carousel-slide
        v-for="image in images"
        :key="image.id"
        :name="image.id"
        swipeable
        navigation
        class="column no-wrap flex-center"
        :img-src="image.url"
      >
        <!-- <img :src="image.url" /> -->
      </q-carousel-slide>
    </q-carousel>

    <div class="row justify-center q-mt-sm">
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

const options = computed(() => {
  return props.images.map((image, index) => {
    return {
      label: index + 1,
      value: image.id,
    };
  });
});

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
