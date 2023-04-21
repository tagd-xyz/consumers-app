import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useAccessRequestStore = defineStore('accessRequest', {
  persist: true,
  state: () => {
    return {
      is: {
        fetching: false,
        approving: false,
        rejecting: false,
      },
    };
  },
  actions: {
    fetch(id) {
      return new Promise((resolve, reject) => {
        this.is.fetching = true;
        api
          .get('resale-access-requests/' + id)
          .then((response) => {
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
    approve(id, code) {
      return new Promise((resolve, reject) => {
        this.is.approving = true;
        api
          .post('resale-access-requests/' + id + '/approve', {
            code: code,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.is.approving = false;
          });
      });
    },
    reject(id) {
      return new Promise((resolve, reject) => {
        this.is.rejecting = true;
        api
          .post('resale-access-requests/' + id + '/reject')
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.is.rejecting = false;
          });
      });
    },
  },
});
