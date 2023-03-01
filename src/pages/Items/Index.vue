<template>
  <div>
    <Header
      :is-loading="isLoading"
      @update="onHeaderUpdate"
      @search="onHeaderSearch"
    />
    <q-page-container class="q-pa-md q-ma-md">
      <div v-if="isLoading" class="flex flex-center">
        <q-spinner color="primary" size="1.5rem" />
      </div>
      <p class="flex flex-center" v-else-if="store.isEmpty">
        There are no items
      </p>
      <div v-else>
        <p class="text-caption">{{ listCount }}</p>
        <q-card
          v-for="item in list"
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
import { computed, onMounted, ref } from 'vue';
import { useItemsStore } from 'stores/items';
import Header from './components/Header.vue';

const searchText = ref('');
const store = useItemsStore();

const isLoading = computed(() => {
  return store.isLoading;
});

const listCount = computed(() => {
  const count = store.list.length;
  return 1 == count ? `${count} result` : `${count} results`;
});

const list = computed(() => {
  const keyword = searchText.value.toLowerCase();
  if ('' == keyword) {
    return store.list;
  } else {
    return store.list.filter(
      (item) =>
        item.description.toLowerCase().includes(keyword) ||
        item.retailer.toLowerCase().includes(keyword)
    );
  }
});

function onHeaderUpdate(button) {
  console.log(button);
}

function onHeaderSearch(text) {
  searchText.value = text.trim();
}

onMounted(() => {
  store.fetch();
});
</script>
