<template>
  <div>
    <header-component />
    <q-page-container>
      <div @click="renewToken">token</div>
    </q-page-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "stores/auth";
import { api } from "boot/axios";
import HeaderComponent from "./HeaderComponent.vue";

const data = ref(null);

const store = useAuthStore();

function renewToken() {
  console.log('will renew token');
}

onMounted(() => {
  api
    .get("/api/backend")
    .then((response) => {
      data.value = response.data;
    })
    .catch(() => {
      // $q.notify({
      //   color: "negative",
      //   position: "top",
      //   message: "Loading failed",
      //   icon: "report_problem",
      // });
    });
});
</script>
