<template>
  <div class="flex gap-x-1 cursor-pointer flex-nowrap items-center" @click="sortClick">
    <div class="label">
      {{ label }}
    </div>
    <div class="flex flex-col">
      <q-icon
        name="expand_less"
        size="20px"
        class="mb-[-10px]"
        :class="
          stateSort == 'up' ? 'text-primary-blue-100' : 'text-primary-blue-50'
        "
      />
      <q-icon
        name="expand_more"
        size="20px"
        :class="
          stateSort == 'down' ? 'text-primary-blue-100' : 'text-primary-blue-50'
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  label: {
    type: String,
  },
  columnSort: {
    type: String,
  },
});
const emits = defineEmits(['onSort']);

const stateSort = ref('');
const sortClick = () => {
  switch (stateSort.value) {
    case '':
      stateSort.value = 'up';
      break;
    case 'up':
      stateSort.value = 'down';
      break;
    default:
      stateSort.value = '';
      break;
  }
  emits('onSort', {
    field: props.columnSort,
    method: stateSort.value,
  });
};
</script>
