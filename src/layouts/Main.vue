<template>
  <q-layout view="hHr lpr fFr">
    <router-view />
    <q-footer bordered class="bg-white text-black footer">
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
          class="q-mx-lg"
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
.q-tab__label {
  font-size: small;
}
.q-tab__icon {
  font-size: 2rem;
  margin-bottom: 0.3rem;
}
</style>
