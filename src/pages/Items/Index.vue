<template>
  <div>
    <Header :is-loading="isLoading" @update="onHeaderUpdate" />
    <q-page-container class="q-pa-md q-ma-md">
      <div v-if="isLoading" class="flex flex-center">
        <q-spinner color="primary" size="1.5rem" />
      </div>
      <p class="flex flex-center" v-else-if="store.isEmpty">
        There are no items
      </p>
      <div v-else>
        <q-card
          v-for="item in store.list"
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useItemsStore } from 'stores/items';
import { api } from 'boot/axios';
import Header from './components/Header.vue';

const isLoading = ref(true);

const store = useItemsStore();

function onHeaderUpdate(button) {
  console.log(button);
}

onMounted(() => {
  isLoading.value = true;
  api
    .get('/api/v1/items')
    .then((response) => {
      const list = response.data.data;
      store.setList(list);
    })
    .catch(() => {
      // $q.notify({
      //   color: "negative",
      //   position: "top",
      //   message: "Loading failed",
      //   icon: "report_problem",
      // });
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>
