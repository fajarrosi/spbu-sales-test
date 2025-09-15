<script lang="ts" setup>
import { scyllaApi } from 'boot/axios';
import { QFieldProps } from 'quasar';
import { computed, ref, watch } from 'vue';
import { Optional } from 'src/types';
import { getImage } from 'src/methods/general';
import StaticRadio from '../StaticRadio.vue';

export type TWarehouseLookup = {
  wh_id: number;
  wh_code: string;
  wh_name: string;
  stock_type: string;
  latitude: string;
  longitude: string;
};

const props = withDefaults(
  defineProps<{ modelValue: Optional<TWarehouseLookup>; qFieldProps?: Partial<QFieldProps> }>(),
  {
    modelValue: undefined,
    qFieldProps: () => ({}),
  }
);

const emits = defineEmits<{
  (e: 'update:modelValue', value: Optional<TWarehouseLookup>): void;
}>();

const value = ref<Optional<TWarehouseLookup>>(props.modelValue);

const loading = ref<boolean>(false);

const showMenu = ref<boolean>(false);

const options = ref<Array<TWarehouseLookup>>([]);

const search = ref<string>('');

const getOptions = async () => {
  try {
    loading.value = true;

    const res = await scyllaApi.get<{ data: Array<TWarehouseLookup> }>('/master/v1/warehouses', {
      params: { mode: 'lookup', q: search.value, sort: 'wh_name:asc' },
    });

    options.value = res.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const label = computed(() => (props.modelValue ? props.modelValue.wh_name : 'Select Warehouse'));

const handleChange = (newValue: Optional<TWarehouseLookup>) => {
  emits('update:modelValue', newValue);
  value.value = newValue;
};

watch([showMenu, search], () => {
  if (showMenu.value && !loading.value) {
    getOptions();
  }
});
</script>
<template>
  <q-field
    v-bind="qFieldProps"
    outlined
    dense
    clearable
    class="search-input max-w-full cursor-pointer"
    @click="showMenu = true"
  >
    <template v-slot:append>
      <q-icon :name="showMenu ? 'expand_less' : 'expand_more'" />
    </template>

    <div class="self-center no-outline ellipsis tx-body-3 text-neutral-90" tabindex="0">
      {{ label }}
    </div>

    <q-menu
      v-model="showMenu"
      class="submenu-teamsales"
      fit
      transition-show="jump-down"
      transition-hide="jump-up"
      :offset="[0, 10]"
    >
      <div class="px-6 pt-6 sticky top-0 bg-white z-10">
        <q-input
          v-model="search"
          debounce="500"
          type="text"
          outlined
          dense
          class="search-input mb-2"
          placeholder="Search Warehouse"
        >
          <template v-slot:append>
            <img :src="getImage('navbar/MagnifyingGlass.svg')" alt="search icon" class="neutral-70-svg w-5 h-5" />
          </template>
        </q-input>
      </div>

      <div v-show="loading" class="w-full py-6 flex justify-center items-center -ml-5">
        <q-circular-progress indeterminate rounded size="50px" class="q-ma-md" />
      </div>

      <q-virtual-scroll
        style="max-height: 300px"
        :items="options"
        separator
        v-slot="{ item, index }: { item: TWarehouseLookup, index: number }"
        class="px-6 pb-6"
        v-show="!loading"
      >
        <q-item tag="label" class="px-0" :key="index" @click="() => handleChange(item)">
          <q-item-section avatar class="!min-w-0">
            <StaticRadio :selected="modelValue?.wh_id === item?.wh_id" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ `${item.wh_code} - ${item.wh_name}` }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-virtual-scroll>
    </q-menu>
  </q-field>
</template>
