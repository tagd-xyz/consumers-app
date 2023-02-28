<template>
  <q-page class="flex flex-center"> Items </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from "../stores/auth";
import { api } from "boot/axios";

const data = ref(null)

const store = useAuthStore();

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
