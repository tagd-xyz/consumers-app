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
  getters: {
    retailers() {
      return [
        ...new Set(
          this.list.map((tagd) => {
            return tagd.item.retailer;
          })
        ),
      ];
    },
  },
  actions: {
    fetchAll() {
      return new Promise((resolve, reject) => {
        this.is.fetching = true;
        api
          .get('tagds')
          .then((response) => {
            this.list = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            this.list = [];
            reject(error);
          })
          .finally(() => {
            this.is.fetching = false;
          });
      });
    },
  },
});
