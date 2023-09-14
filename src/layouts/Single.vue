<template>
  <q-layout view="hHr lpr fFr">
    <q-page-container>
      <offline-banner-component />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import OfflineBannerComponent from 'components/OfflineBannerComponent.vue';
</script>
