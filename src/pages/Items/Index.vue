<template>
  <div>
    <Header :is-loading="isLoading" @update="onHeaderUpdate"/>
    <q-page-container class="">
      <div v-if="isLoading" class="flex flex-center q-pa-md">
        <q-spinner
        color="primary"
        size="1.5rem"
        />
      </div>
    </q-page-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import { useAuthStore } from 'stores/auth';
import { api } from 'boot/axios';
import Header from './components/Header.vue';

const data = ref(null);
const isLoading = ref(true);

// const store = useAuthStore();

function onHeaderUpdate (button) {
  console.log(button);
}

onMounted(() => {
  isLoading.value = true;
  api
    .get('/api/v1/me')
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
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>
