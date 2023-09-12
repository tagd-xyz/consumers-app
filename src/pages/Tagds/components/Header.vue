<template>
  <div>
    <q-header class="bg-white text-black" height-hint="98">
      <offline-banner-component />
      <q-toolbar>
        <q-toolbar-title class="q-my-lg q-mx-md">
          <q-input
            :disable="isLoading"
            outlined
            dense
            v-model="searchText"
            label="Search"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="grey" />
            </template>
          </q-input>
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          :disabled="isLoading"
          icon="filter_list"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
      <q-btn-group class="q-mx-lg" spread rounded>
        <q-btn
          no-caps
          rounded
          label="Inactive"
          :text-color="Tabs.Inactive == activeTab ? 'primary' : ''"
          @click="setActive(Tabs.Inactive)"
        >
          <!-- <q-badge color="orange" floating transparent v-if="inactiveCount > 0">
            {{ inactiveCount }}
          </q-badge> -->
        </q-btn>
        <q-btn
          no-caps
          rounded
          label="Active"
          :text-color="Tabs.Active == activeTab ? 'primary' : ''"
          @click="setActive(Tabs.Active)"
        >
          <!-- <q-badge color="orange" floating transparent v-if="activeCount > 0">
            {{ activeCount }}
          </q-badge> -->
        </q-btn>
        <q-btn
          no-caps
          rounded
          label="Historic"
          :text-color="Tabs.Historic == activeTab ? 'primary' : ''"
          @click="setActive(Tabs.Historic)"
        >
          <!-- <q-badge color="orange" floating transparent v-if="historicCount > 0">
            {{ historicCount }}
          </q-badge> -->
        </q-btn>
      </q-btn-group>
    </q-header>
    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      behavior="mobile"
      bordered
    >
      <items-filter-component />
    </q-drawer>
  </div>
</template>

<script setup>
import { watch, onMounted, ref } from 'vue';
import ItemsFilterComponent from 'src/components/ItemsFilterComponent.vue';
import OfflineBannerComponent from 'components/OfflineBannerComponent.vue';
const Tabs = {
  Inactive: 1,
  Active: 2,
  Historic: 3,
};

const rightDrawerOpen = ref(false);
const searchText = ref('');
const activeTab = ref(Tabs.Active);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  inactiveCount: {
    type: Number,
    default: null,
  },
  activeCount: {
    type: Number,
    default: null,
  },
  historicCount: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(['update', 'search']);

watch(searchText, (currentValue) => {
  emit('search', currentValue);
});

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

function setActive(button) {
  activeTab.value = button;
  emit('update', button);
}

onMounted(() => {});
</script>

<style scoped>
/* .q-header .q-btn-group .q-btn{
  text-transform: none !important;
} */
</style>
