import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useTagdsStore = defineStore('tagds', {
  persist: true,
  state: () => {
    return {
      list: [],
      single: null,
      is: {
        fetchingAll: false,
        fetchingSingle: false,
        activating: false,
      },
    };
  },
  getters: {},
  actions: {
    fetchAll() {
      this.is.fetchingAll = true;
      api
        .get('tagds')
        .then((response) => {
          this.list = response.data.data;
        })
        .catch(() => {
          this.list = [];
        })
        .finally(() => {
          this.is.fetchingAll = false;
        });
    },
    fetch(id) {
      this.single = null;
      this.is.fetchingSingle = true;
      api
        .get('tagds/' + id)
        .then((response) => {
          this.single = response.data.data;
        })
        .catch(() => {
          this.single = null;
        })
        .finally(() => {
          this.is.fetchingSingle = false;
        });
    },
    activate(id) {
      this.is.activating = true;
      api
        .post('tagds/' + id + '/activate')
        .then(() => {})
        .catch(() => {})
        .finally(() => {
          this.is.activating = false;
        });
    },
  },
});
