import { defineStore } from 'pinia';
// import { api } from 'boot/axios';

const filteringOrderOptions = {
  purchaseDate: 'Purchase Date',
  tag: 'Tag',
  retailer: 'Retailer',
  retailersAvailable: [],
};

const filteringTypeOptions = {
  fashion: 'Fashion',
  sneakers: 'Sneakers',
};

export const useUiStore = defineStore('ui', {
  persist: true,
  state: () => {
    return {
      filtering: {
        order: filteringOrderOptions.purchaseDate,
        type: [filteringTypeOptions.fashion, filteringTypeOptions.sneakers],
        retailer: null,
        retailerOptions: [],
        available: true,
        listed: true,
      },
    };
  },
  getters: {
    filteringOrderOptions() {
      return filteringOrderOptions;
    },
    filteringTypeOptions() {
      return filteringTypeOptions;
    },
    filteringRetailerOptions() {
      return this.filtering.retailerOptions;
    },
  },
  actions: {
    setFilteringOrder(order) {
      this.filtering.order = order;
    },
    setFilteringType(type) {
      this.filtering.type = type;
    },
    setFilteringRetailer(retailer) {
      this.filtering.retailer = retailer;
    },
    setFilteringAvailable(available) {
      this.filtering.available = available;
    },
    setFilteringListed(listed) {
      this.filtering.listed = listed;
    },
    setFilteringRetailersOptions(list) {
      this.filtering.retailerOptions = list;
      this.filtering.retailer = list;
    },
  },
});
