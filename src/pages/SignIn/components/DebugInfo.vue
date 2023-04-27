<template>
  <div class="text-subtitle2 q-ma-sm text-grey">
    build {{ buildInfo.id ?? '?' }}@{{ buildInfo.environment ?? '?' }}
  </div>
</template>

<script setup>
import buildInfo from 'assets/buildInfo.json';
</script>
