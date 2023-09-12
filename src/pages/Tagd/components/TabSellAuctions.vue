<template>
  <div>
    <p class="text-h6 q-mb-md">Active auctions ({{ auctionsCount }})</p>

    <q-card flat v-for="auction in auctions" :key="auction.id" class="q-mb-sm">
      <q-card-section horizontal class="bg-grey-2">
        <q-img
          fit="scale-down"
          class="col-3 q-ma-sm"
          :src="auction?.reseller?.logo"
          alt=""
        />
        <q-card-section class="bg-grey-3 full-width">
          <div class="row">
            <div class="col-1 text-grey">Id</div>
            <div class="col text-right text-bold">
              <span class="">{{ auction?.slug }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col text-grey">Date listed</div>
            <div class="col text-right text-bold">
              {{ date.formatDate(auction?.createdAt, 'MMM Do, YYYY') }}
            </div>
          </div>
          <div class="row">
            <div class="col-1 text-grey">Reseller</div>
            <div class="col text-right text-bold">
              <span class="ellipsis-1">
                {{ auction?.reseller?.name }}
              </span>
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
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
/* .logo {
  max-width: 6rem;
} */

.ellipsis-1 {
  width: 150px;
}
</style>
