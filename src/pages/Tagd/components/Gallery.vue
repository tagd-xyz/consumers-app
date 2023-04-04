<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders items-gallery"
    >
      <q-carousel-slide name="1" class="column no-wrap flex-center">
        <img src="https://picsum.photos/id/326/640/480" />
      </q-carousel-slide>
      <q-carousel-slide name="2" class="column no-wrap flex-center">
        <img src="https://picsum.photos/id/370/640/480" />
      </q-carousel-slide>
      <q-carousel-slide name="3" class="column no-wrap flex-center">
        <img src="https://picsum.photos/id/429/640/480" />
      </q-carousel-slide>
      <q-carousel-slide name="4" class="column no-wrap flex-center">
        <img src="https://picsum.photos/id/445/640/480" />
      </q-carousel-slide>
    </q-carousel>

    <div class="row justify-center q-mt-sm">
      <q-btn-toggle
        v-model="slide"
        :options="[
          { label: 1, value: '1' },
          { label: 2, value: '2' },
          { label: 3, value: '3' },
          { label: 4, value: '4' },
        ]"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const slide = ref('1');
</script>

<style scoped>
.items-gallery {
  max-height: 15rem;
}
</style>
