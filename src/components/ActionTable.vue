<template>
  <app-button class="border border-neutral-20 w-8 h-8" bg-color="white" color="neutral-90" padding="p-2">
    <img :src="getImage('table/DotsThree.svg')" alt="icon-gear" />
    <q-menu :offset="[110, 10]" class="submenu-table">
      <q-list style="min-width: 150px">
        <q-item clickable v-close-popup @click="showDetailClick" v-if="showDetail">
          <q-item-section>
            <div class="flex gap-x-3">
              <img :src="getImage('eye-detail.svg')" alt="" />
              <div class="tx-body-3 font-medium text-neutral-70">View Detail</div>
            </div>
          </q-item-section>
        </q-item>
        <app-divider class="w-[90px] mx-auto" />
        <q-item clickable v-close-popup @click="editClick" v-if="showEdit">
          <q-item-section>
            <div class="flex gap-x-3">
              <img :src="getImage('table/PencilSimpleLine.svg')" alt="" />
              <div class="tx-body-3 font-medium text-neutral-70">Edit</div>
            </div>
          </q-item-section>
        </q-item>
        <app-divider class="w-[90px] mx-auto" />
        <q-item clickable v-close-popup @click="deleteClick" v-if="showDelete">
          <q-item-section>
            <div class="flex gap-x-3">
              <img :src="getImage('table/TrashSimple.svg')" alt="" />
              <div class="tx-body-3 font-medium text-neutral-70">Delete</div>
            </div>
          </q-item-section>
        </q-item>
        <app-divider class="w-[90px] mx-auto" />
        <q-item clickable v-close-popup @click="showDetailSalesmanClick" v-if="showDetailSalesman">
          <q-item-section>
            <div class="flex gap-x-3">
              <img :src="getImage('User.svg')" alt="" />
              <div class="tx-body-3 font-medium text-neutral-70">Salesman Detail</div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </app-button>
</template>

<script setup lang="ts">
import { getImage } from 'methods/general';
const props = defineProps({
  row: {
    type: Object,
  },
  showDetail: {
    type: Boolean,
    default: false,
  },
  showDetailSalesman: {
    type: Boolean,
    default: false,
  },
  showEdit: {
    type: Boolean,
    default: true,
  },
  showDelete: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(['onEdit', 'onDelete', 'onShowDetail', 'onShowDetailSalesman']);

const editClick = () => {
  emits('onEdit', props.row);
};

const deleteClick = () => {
  emits('onDelete', props.row);
};

const showDetailClick = () => {
  emits('onShowDetail', props.row);
};

const showDetailSalesmanClick = () => {
  emits('onShowDetailSalesman', props.row);
};
</script>
