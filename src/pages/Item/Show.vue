<template>
  <div>
    <Header @backClicked="onBackClicked" />
    <Gallery />
    <div class="row justify-center q-mt-lg">
      <q-banner
        v-if="!isLoading && !isActive"
        inline-actions
        class="text-white bg-red"
      >
        This item has not been activated yet.
        <template v-slot:action>
          <q-btn
            flat
            color="white"
            label="Activate now"
            :loading="isActivating"
            @click="onActivateClicked"
          />
        </template>
      </q-banner>
      <q-banner
        v-if="!isLoading && isActive"
        inline-actions
        class="text-white bg-info"
      >
        This item is active
      </q-banner>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useTagdsStore } from 'stores/tagds';
import Header from './components/Header.vue';
import Gallery from './components/Gallery.vue';
import { computed, onMounted } from 'vue';

const router = useRouter();
const route = useRoute();
const tagdsStore = useTagdsStore();

const isLoading = computed(() => {
  return tagdsStore.is.fetchingSingle;
});

const isActive = computed(() => {
  return tagdsStore.single?.status == 'active' ?? false;
});

const isActivating = computed(() => {
  return tagdsStore.is.activating;
});

const tagdId = computed(() => {
  return route.params.id;
});

function onActivateClicked() {
  if (!tagdsStore.is.activating) {
    tagdsStore.activate(tagdId.value);
  }
}

function onBackClicked() {
  console.log(2);
  router.go(-1);
}

onMounted(() => {
  if (!tagdsStore.is.fetchingSingle) {
    tagdsStore.fetch(tagdId.value);
  }
});
</script>
