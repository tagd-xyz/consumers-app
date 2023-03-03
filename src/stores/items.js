import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useItemsStore = defineStore('items', {
  persist: true,
  state: () => {
    return {
      list: [],
      is: {
        fetching: false,
      },
    };
  },
  getters: {
    isLoading() {
      return this.is.fetching;
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
      this.is.fetching = true;
      api
        .get('items')
        .then((response) => {
          this.list = response.data.data;
        })
        .catch(() => {
          this.list = [];
        })
        .finally(() => {
          this.is.fetching = false;
        });
    },
  },
});
