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
          :disabled="isLoading"
          :text-color="1 == activeButton ? 'primary' : ''"
          @click="setActive(1)"
        />
        <q-btn
          no-caps
          rounded
          label="Active"
          :disabled="isLoading"
          :text-color="2 == activeButton ? 'primary' : ''"
          @click="setActive(2)"
        />
        <q-btn
          no-caps
          rounded
          label="Historic"
          :disabled="isLoading"
          :text-color="3 == activeButton ? 'primary' : ''"
          @click="setActive(3)"
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
import { ref } from 'vue';
const rightDrawerOpen = ref(false);
const searchText = ref('');
const activeButton = ref(0);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['change']);

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

function setActive(button) {
  activeButton.value = button;
  emit('update', button);
}
</script>

<style scoped>
/* .q-header .q-btn-group .q-btn{
  text-transform: none !important;
} */
</style>
