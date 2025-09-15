<template>
  <q-checkbox
    v-model="checkboxValue"
    :label="label"
    color="primary-red-80"
    class="text-neutral-90 tx-body-3"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  label: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    default: () => false,
  },
});

const emits = defineEmits(['update:modelValue', 'updateCheckbox']);
const checkboxValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emits('update:modelValue', newValue);
    emits('updateCheckbox', {
      label: props.label,
      value: newValue,
    });
  },
});
</script>
