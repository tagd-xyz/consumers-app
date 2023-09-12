import { boot } from 'quasar/wrappers';
import { useNetworkStore } from 'stores/network';
import { ref, watch } from 'vue';

const store = useNetworkStore();
const theRouter = ref(null);

const isApiOk = ref(null);

export default boot(({ router }) => {
  theRouter.value = router;

  check();
  store.setInterval(
    setInterval(() => {
      check();
    }, 1 * 60 * 1000) // 1 minute
  );

  store.setNetworkOk(navigator.onLine);

  window.addEventListener('online', () => {
    store.setNetworkOk(true);
  });
  window.addEventListener('offline', () => {
    store.setNetworkOk(false);
  });
});

function check() {
  store.fetchApiStatus()
    .then(() => {
      isApiOk.value = true;
    })
    .catch(() => {
      isApiOk.value = false;
    });
}

watch(isApiOk, () => {
  if (theRouter.value) {
    if (!isApiOk.value) {
      theRouter.value.push({ name: 'errorNetwork' });
    } else {
      theRouter.value.push('/');
    }
  }
});

export { check };
