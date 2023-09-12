<template>
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <q-icon name="cloud_off" size="xl" style="opacity: 0.4" />

      <!-- <div style="font-size: 30vh">Error</div> -->

      <div class="text-h4" style="opacity: 0.4">We have a little problem.</div>

      <div class="text-h6 q-ma-xl" style="opacity: 0.4">
        We detected a network error.Please make sure you are connected to the
        internet and wait a few minutes before you try again.
      </div>

      <q-btn
        color="white"
        text-color="primary"
        unelevated
        to="/"
        label="Retry"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorNetwork',
});
</script>
