<template>
  <div class="px-6 py-[17px] flex justify-between items-center gap-y-2">
    <div class="flex flex-col" v-if="showLeftSide">
      <div class="flex gap-x-2">
        <div class="tx-title-3 font-semibold" v-if="showTitle">{{ title }}</div>
        <app-chip v-if="showChips">{{ chips }}</app-chip>
      </div>
      <div class="text-xs text-neutral-70" v-if="showSubtitle">{{ subtitle }}</div>
    </div>
    <div class="flex gap-x-3 sideright-table" v-if="can.length > 0">
      <q-input
        :model-value="search"
        @update:model-value="updateSearch"
        type="text"
        outlined
        dense
        :placeholder="placeholderSearch"
        class="search-input"
        debounce="1000"
        :loading="loadsearch"
        v-if="showComponent('search') && !$slots.search"
      >
        <template v-slot:prepend>
          <img :src="getImage('navbar/MagnifyingGlass.svg')" alt="search icon" class="neutral-70-svg w-5 h-5" />
        </template>
        <template v-slot:append>
          <q-icon v-if="search" name="close" class="cursor-pointer" @click="onDeleteSearching" />
        </template>
      </q-input>

      <slot v-if="$slots.search" name="search"></slot>

      <app-button
        class="border border-neutral-20"
        bg-color="white"
        color="neutral-90"
        padding="p-3"
        v-if="showComponent('setting')"
        @click="settingClick"
      >
        <img :src="getImage('table/GearSix.svg')" alt="icon-gear" />
      </app-button>

      <app-button
        class="border border-neutral-20"
        bg-color="white"
        color="neutral-90"
        padding="p-3"
        v-if="showComponent('upload')"
        @click="uploadClick"
      >
        <img :src="getImage('table/UploadSimple.svg')" alt="icon-upload-data" />
      </app-button>
      <app-button
        class="border border-neutral-20"
        bg-color="white"
        color="neutral-90"
        padding="p-3"
        v-if="showComponent('print')"
        @click="printClick"
      >
        <img :src="getImage('table/print.svg')" alt="icon-print" />
      </app-button>
      <slot name="sidebtn"></slot>
      <app-button @click="addClick" v-if="showComponent('add')">
        <div class="flex gap-x-2 items-center">
          <q-icon name="add" size="16px" />
          {{ labelAdd }}
        </div>
      </app-button>
    </div>
    <slot name="sideright"></slot>
  </div>
</template>

<style>
.sideright-table > * {
  height: 40px;
}
</style>

<script setup lang="ts">
import { getImage } from 'methods/general';
import { useTable } from 'stores/useTable';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useTable();

const { search, loadsearch } = storeToRefs(store);

const { getQuery } = store;

const props = defineProps({
  title: {
    type: String,
    default: () => '',
  },
  subtitle: {
    type: String,
    default: () => '',
  },
  chips: {
    type: String,
    default: () => '',
  },
  can: {
    type: Array,
    default: () => ['search', 'add', 'upload', 'setting', 'print'],
  },
  labelAdd: {
    type: String,
    default: () => '',
  },
  placeholderSearch: {
    type: String,
    default: () => 'search',
  },
});

const showChips = computed(()=>{
  return !!props.chips
})

const showTitle = computed(()=>{
  return !!props.title
})

const showSubtitle = computed(()=>{
  return !!props.subtitle
})

const showLeftSide = computed(()=>{
  return !!props.title || !!props.chips || !!props.subtitle
})


const emits = defineEmits(['onSetting', 'onUpload', 'onAdd', 'onPrint']);

const updateSearch = (value: string | number | null) => {
  loadsearch.value = true;
  search.value = value;
  setTimeout(() => {
    if (typeof value == 'string') {
      getQuery({ search: value });
    }
    loadsearch.value = false;
  }, 300);
};

const onDeleteSearching = (): void => {
  search.value = null;
  getQuery({ search: '' });
};

const settingClick = (): void => {
  emits('onSetting');
};

const uploadClick = (): void => {
  emits('onUpload');
};

const addClick = (): void => {
  emits('onAdd');
};

const printClick = (): void => {
  emits('onPrint');
};

const showComponent = (component: string): boolean => {
  return props.can.indexOf(component) >= 0;
};
</script>
