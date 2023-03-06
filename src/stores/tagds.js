import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useTagdsStore = defineStore('tagds', {
  persist: true,
  state: () => {
    return {
      list: [],
      is: {
        fetching: false,
      },
    };
  },
  getters: {},
  actions: {
    fetchAll() {
      this.is.fetching = true;
      api
        .get('tagds')
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
