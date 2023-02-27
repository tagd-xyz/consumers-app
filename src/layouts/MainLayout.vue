<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Tagd </q-toolbar-title>

        <div>demo v.0.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="400"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item exact to="/items" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section> Items </q-item-section>
          </q-item>

          <q-item exact to="/notifications" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="notifications" />
            </q-item-section>

            <q-item-section> Notifications </q-item-section>
          </q-item>

          <q-item exact to="/reseller-verification" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="domain_verification" />
            </q-item-section>

            <q-item-section> Reseller Verification </q-item-section>
          </q-item>

          <q-item exact to="/gift-tag" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="redeem" />
            </q-item-section>

            <q-item-section> Gift Tag </q-item-section>
          </q-item>

          <q-item exact to="/account" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section> Account </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div class="absolute-top bg-light-blue" style="height: 150px">
        <div class="absolute-center">
          <q-avatar size="56px" class="q-mb-sm">
            <img
              src="https://es.gravatar.com/userimage/158710334/56ff754857db581bba7c20fc287d1ce9.jpeg"
            />
          </q-avatar>
          <div class="text-weight-bold">Juan Sierra</div>
          <div>Consumer</div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
// import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    // EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
