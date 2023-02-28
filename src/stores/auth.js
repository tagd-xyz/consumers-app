import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => {
    return { user: false };
  },
  getters: {
    isSignedIn() {
      return false !== this.user;
    },
  },
  actions: {
    signIn(user) {
      this.user = user;
    },
    signOut(user) {
      this.user = false;
    },
  },
});
