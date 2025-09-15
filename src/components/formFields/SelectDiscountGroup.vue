<script setup lang="ts">
import { scyllaApi } from 'boot/axios';
import { ListResponse } from 'src/interface/listResponse';
import { getImage } from 'src/methods/general';
import { DiscountGroup } from 'src/types';
import { computed, ref, watch } from 'vue';

const props = defineProps<{ modelValue: Map<DiscountGroup['disc_grp_id'], DiscountGroup> }>();

const loading = ref<boolean>(false);

const showMenu = ref<boolean>(false);

const options = ref<Array<DiscountGroup>>([]);

const search = ref<string>('');

const getOptions = async () => {
  try {
    loading.value = true;

    const res = await scyllaApi.get<ListResponse<DiscountGroup>>('/master/v1/disc-groups', {
      params: {
        is_active: 1,
        page: 1,
        q: search.value,
      },
    });

    options.value = res.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const onUpdateModelValue = (discountGroup: DiscountGroup) => {
  if (!props.modelValue.has(discountGroup.disc_grp_id)) {
    props.modelValue.set(discountGroup.disc_grp_id, discountGroup);
  } else {
    props.modelValue.delete(discountGroup.disc_grp_id);
  }
};

const label = computed(() =>
  props.modelValue.size <= 0
    ? 'Select Group'
    : Array.from(props.modelValue)
        .map((discountGroup) => discountGroup[1].disc_grp_name)
        .join(' , ')
);

watch([showMenu, search], () => {
  if (showMenu.value && !loading.value) {
    getOptions();
  }
});
</script>
<template>
  <q-field outlined dense class="search-input max-w-full cursor-pointer" @click="showMenu = true">
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
          class="search-input"
          placeholder="Search Discount Group"
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
        v-slot="{ item, index }"
        class="px-6 pb-6"
        v-show="!loading"
      >
        <q-item tag="label" class="px-0" :key="index">
          <q-checkbox
            :model-value="modelValue.has(item.disc_grp_id)"
            :label="item.disc_grp_name"
            @update:model-value="() => onUpdateModelValue(item)"
          />
        </q-item>
      </q-virtual-scroll>
    </q-menu>
  </q-field>
</template>
