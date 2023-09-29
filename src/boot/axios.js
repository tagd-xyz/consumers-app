import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { useAuthStore } from 'stores/auth';
import { auth } from 'boot/firebase';

const store = useAuthStore();

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.API_URL });

export default boot(({ router }) => {
  /** { app } */
  api.interceptors.request.use(async (req) => {
    const { token } = store;
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      switch (error.response.status) {
        case 401:
        case 403:
          auth.signOut().then(() => {
            router.push({ name: 'signIn' });
          });
          break;
        default:
          //do nothing
          break;
      }
      return Promise.reject(error);
    }
  );
  // for use inside Vue files (Options API) through this.$axios and this.$api

  // app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
