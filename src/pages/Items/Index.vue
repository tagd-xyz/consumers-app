<template>
  <div>
    <Header
      :is-loading="isLoading"
      @update="onHeaderUpdate"
      @search="onHeaderSearch"
      :inactive-count="listInactive.length"
      :active-count="listActive.length"
      :historic-count="listHistoric.length"
    />
    <q-tab-panels v-model="activeTab" animated>
      <q-tab-panel :name="Tabs.Inactive">
        <List
          :is-loading="isLoading"
          :tagds="listInactive"
          @tagdClick="onTagdClicked"
        />
      </q-tab-panel>

      <q-tab-panel :name="Tabs.Active">
        <List
          :is-loading="isLoading"
          :tagds="listActive"
          @tagdClick="onTagdClicked"
        />
      </q-tab-panel>

      <q-tab-panel :name="Tabs.Historic">
        <List
          :is-loading="isLoading"
          :tagds="listHistoric"
          @tagdClick="onTagdClicked"
        />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useTagdsStore } from 'stores/tagds';
import { useRouter } from 'vue-router';
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
};

const searchText = ref('');
const activeTab = ref(Tabs.Inactive);
const store = useTagdsStore();
const router = useRouter();

const isLoading = computed(() => {
  return store.is.fetchingAll;
});

const list = computed(() => {
  const keyword = searchText.value.toLowerCase();
  if ('' == keyword) {
    return store.list;
  } else {
    return store.list.filter(
      (tagd) =>
        tagd.item.description.toLowerCase().includes(keyword) ||
        tagd.item.retailer.toLowerCase().includes(keyword)
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
  return list.value.filter((tagd) => {
    return tagd.status == status;
  });
}

function onHeaderUpdate(tab) {
  activeTab.value = tab;
}

function onHeaderSearch(text) {
  searchText.value = text.trim();
}

onMounted(() => {
  store.fetchAll();
});

function onTagdClicked(tagd) {
  router.push({
    name: 'item',
    params: {
      id: tagd.id,
    },
  });
}
</script>
