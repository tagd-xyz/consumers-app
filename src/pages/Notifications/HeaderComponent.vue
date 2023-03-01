<template>
  <div>
    <q-header class="bg-white text-black" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          Notifications
        </q-toolbar-title>

        <q-btn dense label="Clear"/>
      </q-toolbar>
    </q-header>
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
  },
};
</script>

<style scoped>
.q-header .q-btn-group .q-btn{
  text-transform: none !important;
}
</style>
