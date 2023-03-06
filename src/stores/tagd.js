import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useTagdStore = defineStore('tagd', {
  persist: true,
  state: () => {
    return {
      data: null,
      is: {
        fetching: false,
        activating: false,
        enablingForResale: false,
      },
    };
  },
  getters: {},
  actions: {
    fetch(id) {
      this.single = null;
      this.is.fetching = true;
      api
        .get('tagds/' + id)
        .then((response) => {
          this.single = response.data.data;
        })
        .catch(() => {
          this.single = null;
        })
        .finally(() => {
          this.is.fetching = false;
        });
    },
    enableForResale(id) {
      this.is.enablingForResale = true;
      api
        .post('tagds/' + id + '/enableForResale')
        .then(() => {
          this.fetch(id);
        })
        .catch(() => {})
        .finally(() => {
          this.is.enablingForResale = false;
        });
    },
    disableForResale(id) {
      this.is.enablingForResale = true;
      api
        .post('tagds/' + id + '/disableForResale')
        .then(() => {
          this.fetch(id);
        })
        .catch(() => {})
        .finally(() => {
          this.is.enablingForResale = false;
        });
    },
  },
});
