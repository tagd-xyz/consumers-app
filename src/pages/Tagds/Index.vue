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
import { useUiStore } from 'stores/ui';
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
const activeTab = ref(Tabs.Active);
const tagdsStore = useTagdsStore();
const uiStore = useUiStore();
const router = useRouter();

const isLoading = computed(() => {
  return tagdsStore.is.fetchingAll;
});

const list = computed(() => {
  const keyword = searchText.value.toLowerCase();
  if ('' == keyword) {
    return tagdsStore.list;
  } else {
    return tagdsStore.list.filter(
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
  const listByStatus = list.value.filter((tagd) => {
    return tagd.status == status;
  });

  const listFiltered = filterItemsByFilters(listByStatus);
  return sortItems(listFiltered);
}

function sortItems(items) {
  return items.sort(function (a, b) {
    switch (uiStore.filtering.order.selected) {
      case uiStore.filtering.order.options.tag:
        return a.slug - b.slug;

      case uiStore.filtering.order.options.retailer:
        return a.item.retailer - b.item.retailer;

      case uiStore.filtering.order.options.purchaseDate:
      default:
        return a.createdAt - b.createdAt;
    }
  });
}

function filterItemsByFilters(items) {
  const types = uiStore.filtering.type.selected;
  const retailers = uiStore.filtering.retailer.selected;
  const availableFilter = uiStore.filtering.resale.available;
  const listedFilter = uiStore.filtering.resale.listed;

  return items.filter(function (item) {
    const passAvailableFilter =
      null == availableFilter ||
      (availableFilter && item.isAvailableForResale) ||
      (!availableFilter && !item.isAvailableForResale);

    const isListed = false; //item.tagd.auctions?.length;
    const passListedFilter =
      null == listedFilter ||
      (listedFilter && isListed) ||
      (!listedFilter && !isListed);

    console.log(item.item.type, types, types?.includes(item.item.type));

    return (
      types?.includes(item.item.type) &&
      retailers?.includes(item.item.retailer) &&
      passAvailableFilter &&
      passListedFilter
    );
  });
}

function onHeaderUpdate(tab) {
  activeTab.value = tab;
}

function onHeaderSearch(text) {
  searchText.value = text.trim();
}

// function initActiveTab() {
//   console.log('initActiveTab');
//   activeTab.value = Tabs.Active;
//   console.log(activeTab.value);
// }

onMounted(() => {
  tagdsStore.fetchAll().then(() => {
    // initActiveTab();
  });
});

function onTagdClicked(tagd) {
  router.push({
    name: 'tagd',
    params: {
      id: tagd.id,
    },
  });
}
</script>
