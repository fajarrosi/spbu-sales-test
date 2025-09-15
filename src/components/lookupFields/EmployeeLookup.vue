<script lang="ts" setup>
import { scyllaApi } from 'boot/axios';
import { QFieldProps } from 'quasar';
import { computed, ref, watch } from 'vue';
import { Optional } from 'src/types';
import { getImage } from 'src/methods/general';
import StaticRadio from '../StaticRadio.vue';

export type TEmployeeLookup = {
  emp_id: number;
  emp_code: string;
  emp_name: string;
  address: string;
  city: string;
  last_education: string;
  phone_no: string;
  wa_no: string;
  email: string;
  emp_type_id: string;
  emp_type_name: string;
  emp_grp_id: number;
  emp_grp_code: string | null;
  emp_grp_name: string | null;
  dob: string;
  work_date: string;
  image_url: string;
  province_id: number | null;
  province: string;
  city_id: string;
  sub_district_id: string;
  sub_district: string;
  ward_id: string;
  ward: string;
  identity_no: string;
  is_wa_no: boolean;
  post_code: string;
  division_id: number | null;
  division_name: string | null;
};

const props = withDefaults(
  defineProps<{ modelValue: Optional<TEmployeeLookup>; qFieldProps?: Partial<QFieldProps> }>(),
  {
    modelValue: undefined,
    qFieldProps: () => ({}),
  }
);

const emits = defineEmits<{
  (e: 'update:modelValue', value: Optional<TEmployeeLookup>): void;
}>();

const value = ref<Optional<TEmployeeLookup>>(props.modelValue);

const loading = ref<boolean>(false);

const showMenu = ref<boolean>(false);

const options = ref<Array<TEmployeeLookup>>([]);

const search = ref<string>('');

const getOptions = async () => {
  try {
    loading.value = true;

    const res = await scyllaApi.get<{ data: Array<TEmployeeLookup> }>('/master/v1/employees', {
      params: { mode: 'lookup', q: search.value },
    });

    options.value = res.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const label = computed(() => (props.modelValue ? props.modelValue.emp_name : 'Select Employee'));

const handleChange = (newValue: Optional<TEmployeeLookup>) => {
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
          placeholder="Search Employee"
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
        v-slot="{ item, index }: { item: TEmployeeLookup, index: number }"
        class="px-6 pb-6"
        v-show="!loading"
      >
        <q-item tag="label" class="px-0" :key="index" @click="() => handleChange(item)">
          <q-item-section avatar class="!min-w-0">
            <StaticRadio :selected="modelValue?.emp_id === item?.emp_id" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ `${item.emp_code} - ${item.emp_name}` }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-virtual-scroll>
    </q-menu>
  </q-field>
</template>
