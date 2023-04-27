<template>
  <q-layout view="hHr lpr fFr">
    <router-view />
    <q-footer bordered class="bg-white text-black">
      <q-tabs
        align="center"
        indicator-color="transparent"
        active-color="primary"
        :breakpoint="0"
      >
        <q-route-tab no-caps to="/items" icon="sell" label="Your Tags" />
        <q-route-tab
          no-caps
          to="/notifications"
          icon="notifications"
          label="Notifications"
        />
        <q-route-tab
          no-caps
          to="/account"
          icon="account_circle"
          label="Account"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
export default {};
</script>

<style>
/* .q-footer .q-tab__label {
  text-transform: none !important;
} */
</style>
