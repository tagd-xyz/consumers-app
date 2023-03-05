<template>
  <div>
    <q-header class="bg-white text-black" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-input
            :disable="isLoading"
            outlined
            dense
            v-model="searchText"
            label="Search"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
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
      <q-btn-group class="q-mx-xl" spread rounded>
        <q-btn
          no-caps
          rounded
          label="Inactive"
          :disabled="isLoading || 0 == inactiveCount"
          :text-color="Tabs.Inactive == activeTab ? 'primary' : ''"
          @click="setActive(Tabs.Inactive)"
        />
        <q-btn
          no-caps
          rounded
          label="Active"
          :disabled="isLoading || 0 == activeCount"
          :text-color="Tabs.Active == activeTab ? 'primary' : ''"
          @click="setActive(Tabs.Active)"
        >
          <q-badge color="orange" floating transparent>
            {{ activeCount }}
          </q-badge>
        </q-btn>
        <q-btn
          no-caps
          rounded
          label="Historic"
          :disabled="isLoading || 0 == historicCount"
          :text-color="Tabs.Historic == activeTab ? 'primary' : ''"
          @click="setActive(Tabs.Historic)"
        />
      </q-btn-group>
    </q-header>
    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      behavior="mobile"
      bordered
    >
      <!-- drawer content -->
    </q-drawer>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';

const Tabs = {
  Inactive: 1,
  Active: 2,
  Historic: 3,
};

const rightDrawerOpen = ref(false);
const searchText = ref('');
const activeTab = ref(Tabs.Inactive);

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
</script>

<style scoped>
/* .q-header .q-btn-group .q-btn{
  text-transform: none !important;
} */
</style>
