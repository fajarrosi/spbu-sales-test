<template>
  <transition appear enter-active-class="animated fadeInDown">
    <div class="px-6 py-[20px] flex justify-between" v-if="rows.length > 0">
      <div class="flex gap-x-2 items-center">
        <div class="tx-body-3 text-neutral-90">Showing</div>
        <q-input
          :model-value="limit"
          @update:model-value="updateLimit"
          type="number"
          class="search-input w-[56px] h-[28px] showing"
          outlined
          debounce="1000"
          dense
          input-class="font-medium w-[22px]"
          min="1"
        >
          <template v-slot:append>
            <div class="flex flex-col gap-y-1 w-4 h-4">
              <app-button bg-color="white" padding="p-0" @click="increment">
                <div class="flex flex-center">
                  <img :src="getImage('table/arrow_up.svg')" alt="arrow up" />
                </div>
              </app-button>
              <app-button bg-color="white" padding="p-0" @click="decrease">
                <div class="flex flex-center">
                  <img :src="getImage('table/arrow_up.svg')" alt="arrow down" class="rotate-180" />
                </div>
              </app-button>
            </div>
          </template>
        </q-input>
        <div class="tx-body-3 text-neutral-90">rows</div>
      </div>
      <q-pagination
        :model-value="page"
        @update:model-value="updatePage"
        :max="totalPage"
        direction-links
        flat
        color="inactive-page"
        active-color="primary"
        class="paginate-table"
        :max-pages="4"
        :boundary-numbers="false"
      />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { getImage } from 'methods/general';
import { useTable } from 'stores/useTable';
import { storeToRefs } from 'pinia';

const store = useTable();

const { limit, page, totalPage, rows } = storeToRefs(store);

const { getQuery } = store;

const emits = defineEmits(['updatePagination']);

const props = defineProps({
  outsideUpdate: {
    type: Boolean,
    default: false,
  },
});

const updatePage = (value: number) => {
  page.value = value;
  if (props.outsideUpdate) {
    emits('updatePagination', '');
  } else {
    getQuery({ page: page.value, limit: limit.value });
  }
};

const updateLimit = (value: string | number | null) => {
  if (value) {
    page.value = 1;
    if (typeof value == 'number') {
      limit.value = value;
    } else if (typeof value == 'string') {
      limit.value = parseInt(value);
    }
    if (props.outsideUpdate) {
      emits('updatePagination', '');
    } else {
      getQuery({ page: page.value, limit: limit.value });
    }
  }
};

const increment = () => {
  limit.value += 1;
  if (props.outsideUpdate) {
    emits('updatePagination', '');
  } else {
    getQuery({ limit: limit.value });
  }
};

const decrease = (): void => {
  if (limit.value > 1) {
    limit.value -= 1;
    if (props.outsideUpdate) {
      emits('updatePagination', '');
    } else {
      getQuery({ page: page.value, limit: limit.value });
    }
  }
};
</script>
