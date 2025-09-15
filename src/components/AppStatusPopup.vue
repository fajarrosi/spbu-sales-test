<template>
  <div class="flex gap-x-1 cursor-pointer items-center">
    <div class="label">
      {{ label }}
    </div>
    <div class="flex flex-col">
      <q-icon
        name="expand_less"
        size="20px"
        class="mb-[-10px] text-primary-blue-50"
      />
      <q-icon name="expand_more" class="text-primary-blue-50" size="20px" />
    </div>
    <q-menu class="submenu-status">
      <q-list style="min-width: 100px">
        <q-item class="p-6">
          <div class="flex flex-col">
            <CheckboxToggleComp
              v-for="(option, index) in options"
              :key="index"
              :label="option.label"
              :model-value="option.value"
              @updateCheckbox="onUpdated"
            />
          </div>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script setup lang="ts">
import CheckboxToggleComp from './CheckboxToggleComp.vue';
import { ref } from 'vue';
import { useTable } from 'stores/useTable';

const store = useTable();

const { getQuery } = store;

defineProps({
  label: {
    type: String,
  },
});

const options = ref([
  { label: 'All', value: true },
  { label: 'Active', value: false },
  { label: 'Non Active', value: false },
]);

interface checkboxProps {
  label: string;
  value: boolean;
}

const getStatus = (status = 'All') => {
  switch (status) {
    case 'Active':
      return 1;
    case 'Non Active':
      return 2;
    default:
      return 0;
  }
};

const onUpdated = (checkbox: checkboxProps): void => {
  options.value = options.value.map((el) => {
    return {
      ...el,
      value: checkbox.label == el.label ? true : false,
    };
  });
  getQuery({ status: getStatus(checkbox.label) });
};
</script>
