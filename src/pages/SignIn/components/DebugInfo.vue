<template>
  <div class="text-subtitle2 q-ma-sm text-grey">
    build {{ buildId }}@{{ buildBranch }}
  </div>
</template>

<script setup>
import { computed } from 'vue';

const buildId = computed(() => {
  return process.env.DEBUG_BUILD_ID ?? '?';
});

const buildBranch = computed(() => {
  return process.env.DEBUG_BRANCH ?? '?';
});
</script>
