import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useAccessRequestsStore = defineStore('accessRequests', {
  persist: true,
  state: () => {
    return {
      list: [],
      is: {
        fetching: false,
      },
    };
  },
  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.is.fetching = true;
        api
          .get('resale-access-requests')
          .then((response) => {
            this.list = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.is.fetching = false;
          });
      });
    },
  },
});
