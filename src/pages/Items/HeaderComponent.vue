<template>
  <div>
    <q-header class="bg-white text-black" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-input outlined dense v-model="text" label="Search">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar-title>

        <q-btn dense flat round icon="filter_list" @click="toggleRightDrawer" />
      </q-toolbar>
      <q-btn-group class="q-mx-xl" spread rounded>
        <q-btn no-caps rounded label="Inactive"/>
        <q-btn no-caps rounded label="Active" text-color="primary"/>
        <q-btn no-caps rounded label="Historic" />
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

<script>
import { ref } from "vue";
export default {
  name: "HeaderComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const rightDrawerOpen = ref(false);

    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
};
</script>

<style scoped>
/* .q-header .q-btn-group .q-btn{
  text-transform: none !important;
} */
</style>
