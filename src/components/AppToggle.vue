<template>
  <label class="toggle-container cursor-pointer w-[120px]">
    <input
      type="checkbox"
      v-model="statusForm"
      class="toggle-custom w-[120px]"
      name="toggle Status"
    />
    <div class="toggle-text font-medium tx-body-3">
      {{ statusForm ? activeLabel : deactiveLabel }}
    </div>
  </label>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false,
  },
  activeLabel: {
    type: String,
    default: 'Active',
  },
  deactiveLabel: {
    type: String,
    default: 'Deactive',
  },
});

const emits = defineEmits(['update:modelValue']);
const statusForm = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emits('update:modelValue', newValue);
  },
});
</script>
