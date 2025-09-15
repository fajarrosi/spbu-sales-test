<script setup lang="ts">
import { getImage } from 'methods/general';
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Select Date',
  },
  minimal: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:value']);
const tanggalComp = ref<any>(null);
const dateModel = ref(props.value);

onMounted(() => {
  if (props.value) {
    dateModel.value = props.value;
  }
});
const showDate = () => {
  if (tanggalComp.value) {
    tanggalComp.value.show();
  }
};
const onUpdateDate = (value: string) => {
  dateModel.value = value;
  emits('update:value', value);
  if (tanggalComp.value) {
    tanggalComp.value.hide();
  }
};
const showComp = computed(() => !!dateModel.value);
</script>
<template>
  <q-input
    v-model="dateModel"
    mask="##/##/####"
    outlined
    class="search-input grow"
    dense
    hide-bottom-space
    @click="showDate"
    v-bind="$attrs"
  >
    <template v-slot:default>
      <div v-if="!dateModel" class="text-neutral-50 absolute left-0 top-1/2 -translate-y-1/2">
        {{ placeholder }}
      </div>
    </template>
    <template v-slot:append>
      <q-icon name="close" class="cursor-pointer" @click="onUpdateDate('')" v-if="showComp" />
      <div class="cursor-pointer">
        <img :src="getImage('CalendarBlank.svg')" alt="" />
        <q-popup-proxy cover transition-show="scale" transition-hide="scale" ref="tanggalComp">
          <q-date mask="DD/MM/YYYY" :model-value="dateModel" @update:model-value="onUpdateDate" :minimal="minimal">
            <!-- <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div> -->
          </q-date>
        </q-popup-proxy>
      </div>
    </template>
  </q-input>
</template>

<style></style>
