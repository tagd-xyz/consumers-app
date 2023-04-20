import { defineStore } from 'pinia';

const filteringOrderOptions = {
  purchaseDate: 'Purchase Date',
  tag: 'Tag',
  retailer: 'Retailer',
  retailersAvailable: [],
};

const filteringTypeOptions = {
  fashion: 'fashion',
  sneakers: 'sneakers',
};

const filteringResaleOptions = {
  all: null,
  yes: true,
  no: false,
};

export const useUiStore = defineStore('ui', {
  persist: true,
  state: () => {
    return {
      filtering: {
        order: {
          options: filteringOrderOptions,
          selected: filteringOrderOptions.purchaseDate,
        },
        type: {
          options: filteringTypeOptions,
          selected: [
            filteringTypeOptions.fashion,
            filteringTypeOptions.sneakers,
          ],
        },
        retailer: {
          options: [],
          selected: null,
        },
        brand: {
          options: [],
          selected: null,
        },
        resale: {
          options: filteringResaleOptions,
          available: filteringResaleOptions.all,
          listed: filteringResaleOptions.all,
        },
      },
    };
  },
  getters: {},
  actions: {
    setFilteringOrder(order) {
      this.filtering.order.selected = order;
    },
    setFilteringType(type) {
      this.filtering.type.selected = type;
    },
    setFilteringRetailer(retailer) {
      this.filtering.retailer.selected = retailer;
    },
    setFilteringBrand(brand) {
      this.filtering.brand.selected = brand;
    },
    setFilteringResaleAvailable(available) {
      this.filtering.resale.available = available;
    },
    setFilteringResaleListed(listed) {
      this.filtering.resale.listed = listed;
    },
    setFilteringRetailerOptions(list) {
      this.filtering.retailer.options = list;
      this.filtering.retailer.selected = list;
    },
    setFilteringBrandOptions(list) {
      this.filtering.brand.options = list;
      this.filtering.brand.selected = list;
    },
  },
});
