import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useNotificationsStore = defineStore('notifications', {
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
    fetchAll() {
      return new Promise((resolve, reject) => {
        this.is.fetching = true;
        api
          .get('notifications')
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
