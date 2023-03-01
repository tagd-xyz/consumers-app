import { defineStore } from 'pinia';

export const useItemsStore = defineStore('items', {
  persist: true,
  state: () => {
    return {
      list: [],
    };
  },
  getters: {
    isEmpty() {
      return 0 == this.list.length;
    },
  },
  actions: {
    setList(list) {
      this.list = list;
    },
  },
});
