import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useItemsStore = defineStore('items', {
  persist: true,
  state: () => {
    return {
      list: [],
      isFetching: false,
    };
  },
  getters: {
    isLoading() {
      return this.isFetching;
    },
    isEmpty() {
      return 0 == this.list.length;
    },
    getList() {
      return this.list;
    },
  },
  actions: {
    fetch() {
      this.isFetching = true;
      api
        .get('/api/v1/items')
        .then((response) => {
          this.list = response.data.data;
        })
        .catch(() => {
          this.list = [];
        })
        .finally(() => {
          this.isFetching = false;
        });
    },
  },
});
