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
      return new Promise((resolve, reject) => {
        this.data = null;
        this.is.fetching = true;
        api
          .get('tagds/' + id)
          .then((response) => {
            this.data = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            this.data = null;
            reject(error);
          })
          .finally(() => {
            this.is.fetching = false;
          });
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
