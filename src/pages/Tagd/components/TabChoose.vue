<template>
  <q-btn-group class="q-mt-lg q-mx-lg q-mb-sm" spread rounded>
    <q-btn no-caps rounded label="Sell" :text-color="Tabs.Sell == activeTab ? 'primary' : ''"
      @click="setActive(Tabs.Sell)" />
    <q-btn no-caps rounded label="Item" :text-color="Tabs.Item == activeTab ? 'primary' : ''"
      @click="setActive(Tabs.Item)">
    </q-btn>
    <q-btn no-caps rounded label="Details" :text-color="Tabs.Details == activeTab ? 'primary' : ''"
      @click="setActive(Tabs.Details)" />
  </q-btn-group>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  active: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['tabClick']);

const Tabs = {
  Sell: 1,
  Item: 2,
  Details: 3,
};

const activeTab = ref(null);

function setActive(tab) {
  activeTab.value = tab;
  emit('tabClick', tab);
}

onMounted(() => {
  setActive(props.active);
});
</script>
