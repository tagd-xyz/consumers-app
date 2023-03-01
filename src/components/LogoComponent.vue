<template>
  <span>
    <img
      v-if="variant == 'dark'"
      class="tagd-logo full-width"
      src="~/assets/logo-white.png"
    />
    <img
      v-if="variant == 'light'"
      class="tagd-logo full-width"
      src="~/assets/logo-black.png"
    />
  </span>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "light",
  },
});
</script>

<style scoped>
.tagd-logo {
  /* height: 24px; */
}
</style>
