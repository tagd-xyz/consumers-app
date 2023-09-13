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
    brands() {
      return [
        ...new Set(
          this.list.map((tagd) => {
            return tagd.item.properties?.brand;
          })
        ),
      ];
    },
    types() {
      const names = new Set();
      const set = [];
      this.list.forEach((tagd) => {
        if (!names.has(tagd.item.type.name)) {
          set.push(tagd.item.type);
        }
        names.add(tagd.item.type.name);
      });

      return [
        ...set,
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
