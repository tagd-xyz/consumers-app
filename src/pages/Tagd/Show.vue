<template>
  <div>
    <Header @backClicked="onBackClicked" />
    <div v-if="!isLoading">
      <Gallery v-if="tagd?.item.images.length > 0" :images="tagd?.item.images"
        :is-listed-for-resale="tagd.auctions?.length > 0 ?? false" :is-available-for-resale="tagd.isAvailableForResale && 0 == (tagd.auctions?.length ?? 0)
          " />

      <TabChoose :active="Tabs.Item" @tabClick="onTabClicked" />

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel :name="Tabs.Sell">
          <TabSell :tagd="tagd" />
        </q-tab-panel>

        <q-tab-panel :name="Tabs.Item">
          <TabItem :tagd="tagd" />
        </q-tab-panel>

        <q-tab-panel :name="Tabs.Details">
          <TabDetails :tagd="tagd" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useTagdStore } from 'stores/tagd';
import Header from './components/Header.vue';
import Gallery from './components/Gallery.vue';
import TabChoose from './components/TabChoose.vue';
import TabSell from './components/TabSell.vue';
import TabItem from './components/TabItem.vue';
import TabDetails from './components/TabDetails.vue';
import { computed, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

//TODO reuse
const Tabs = {
  Sell: 1,
  Item: 2,
  Details: 3,
};

const activeTab = ref(null);
const router = useRouter();
const route = useRoute();
const tagdStore = useTagdStore();
const $q = useQuasar();

$q.loading.show({
  delay: 1000,
});

const isLoading = computed(() => {
  return tagdStore.is.fetching;
});

const tagd = computed(() => {
  return tagdStore.data;
});

// const isActive = computed(() => {
//   return tagdStore.single?.status == 'active' ?? false;
// });

// const isActivating = computed(() => {
//   return tagdStore.is.activating;
// });

const tagdId = computed(() => {
  return route.params.id;
});

// function onActivateClicked() {
//   if (!tagdStore.is.activating) {
//     tagdStore.activate(tagdId.value);
//   }
// }

function onBackClicked() {
  router.push({ name: 'tagds' });
}

function onTabClicked(tab) {
  activeTab.value = tab;
}

onMounted(() => {
  tagdStore.fetch(tagdId.value).finally(() => {
    $q.loading.hide();
  });
});
</script>
