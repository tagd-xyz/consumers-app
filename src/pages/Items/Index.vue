<template>
  <div>
    <Header
      :is-loading="isLoading"
      @update="onHeaderUpdate"
      @search="onHeaderSearch"
    />
    <q-tab-panels v-model="activeTab" animated>
      <q-tab-panel :name="Tabs.Inactive">
        <List :is-loading="isLoading" :items="listInactive" />
      </q-tab-panel>

      <q-tab-panel :name="Tabs.Active">
        <List :is-loading="isLoading" :items="listActive" />
      </q-tab-panel>

      <q-tab-panel :name="Tabs.Historic">
        <List :is-loading="isLoading" :items="listHistoric" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useItemsStore } from 'stores/items';
import Header from './components/Header.vue';
import List from './components/List.vue';

//TODO: reuse from component
const Tabs = {
  Inactive: 1,
  Active: 2,
  Historic: 3,
};

const Status = {
  Active: 'active',
  Inactive: 'inactive',
  Transferred: 'transferred',
}

const searchText = ref('');
const activeTab = ref(Tabs.Inactive);
const store = useItemsStore();

const isLoading = computed(() => {
  return store.isLoading;
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

const listInactive = computed(() => {
  return filterItemsByTagdStatus(Status.Inactive);
});

const listActive = computed(() => {
  return filterItemsByTagdStatus(Status.Active);
});

const listHistoric = computed(() => {
  return filterItemsByTagdStatus(Status.Transferred);
});

function filterItemsByTagdStatus(status) {
  return list.value.filter((item) => {
    return (
      item.tagds.filter((tagd) => {
        return tagd.status == status;
      }).length > 0
    );
  });
}

function onHeaderUpdate(tab) {
  activeTab.value = tab;
}

function onHeaderSearch(text) {
  searchText.value = text.trim();
}

onMounted(() => {
  store.fetch();
});
</script>
