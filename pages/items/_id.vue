<template>
  <div>
    <b-breadcrumb :items="path"></b-breadcrumb>
    <b-container>
      <page-heading>
        <template v-slot:title>Item details</template>
        <template v-slot:actions>
          <b-button size="sm" variant="outline" @click="cancelClicked">
            Back
          </b-button>
        </template>
      </page-heading>
      <hr />
      <items-details
        :is-busy="isBusy"
        :item="item"
        :allow-expire="true"
        :allow-transfer="true"
      />
      <hr />
      <b-row>
        <b-col class="text-right">
          <b-button
            :disabled="tagdCount > 1"
            size="sm"
            variant="danger"
            @click="deleteClicked"
          >
            Delete
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ItemsIdPage',
  layout: 'retailers',
  middleware: 'auth',

  async asyncData({ params }) {
    // eslint-disable-line require-await
    const id = params.id;
    return { id };
  },
  data() {
    return {
      isBusy: true,
      isSettingAsActive: false,
      path: [
        {
          text: 'Home',
          href: '/',
        },
        {
          text: 'Items',
          href: '/items',
        },
        {
          text: 'Details',
          active: true,
        },
      ],
    };
  },
  computed: {
    item() {
      return this.$store.state.item.data;
    },
    tagdCount() {
      return this.item?.tagds?.length ?? 0;
    },
    rootTagd() {
      return this.item.tagds?.filter((tagd) => tagd.isRoot)[0] || null;
    },
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    this.fetch(this.id).then((res) => {
      this.isBusy = false;
    });
  },
  methods: {
    activeClicked() {
      this.isSettingAsActive = true;
      // eslint-disable-next-line no-unused-vars
      this.setAsActive(this.rootTagd?.id).then((res) => {
        // eslint-disable-next-line no-unused-vars
        this.fetch(this.id).then((res) => {
          this.isSettingAsActive = false;
        });
      });
    },
    deleteClicked() {
      // eslint-disable-next-line no-unused-vars
      this.deleteById(this.id).then((res) => {
        this.$router.push({ path: '/items' });
      });
    },
    cancelClicked() {
      this.$router.push({ path: '/items' });
    },
    ...mapActions({
      fetch: 'item/fetchById',
      deleteById: 'item/delete',
      setAsActive: 'item/setAsActive',
    }),
  },
};
</script>
