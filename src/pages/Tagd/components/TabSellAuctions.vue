<template>
  <div>
    <p class="text-h6 no-margin">Active auctions ({{ auctionsCount }})</p>

    <div class="row" v-for="auction in auctions" :key="auction.id">
      <div class="col">
        <img class="logo" :src="auction?.reseller?.logo" alt="" />
      </div>
      <div class="col-8">
        <div class="row">
          <div class="col text-grey">ID</div>
          <div class="col">{{ auction?.slug }}</div>
        </div>
        <div class="row">
          <div class="col text-grey">Date listed</div>
          <div class="col">
            {{ date.formatDate(auction?.createdAt, 'MMMM Do, YYYY HH:mm:ss') }}
          </div>
        </div>
        <div class="row">
          <div class="col text-grey">Reseller</div>
          <div class="col">{{ auction?.reseller?.name }}</div>
        </div>
      </div>
      <!-- <div class="col text-right">
        <a href="{{ auction.reseller.website }}" target="_blank"> link </a>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { date } from 'quasar';
import { computed } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  auctions: {
    type: Array,
    required: true,
  },
});

const auctionsCount = computed(() => {
  return props.auctions?.length;
});
</script>

<style scoped>
.logo {
  max-width: 6rem;
}
</style>
