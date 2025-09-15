<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Props {
  modelValue: number | null;
  placeholder?: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: number | null): void;
}>();

// Input value ref that displays the formatted number as a string
const inputValue = ref<string>(props.modelValue ? formatNumber(props.modelValue.toString()) : '');

// Format number with period for thousands and comma for decimals
function formatNumber(value: string): string {
  const newValue = value.replace(/\./g, ',');
  // Remove any non-numeric characters except the comma for decimals
  const rawValue = newValue.replace(/[^\d,]/g, '');

  // Split integer and decimal parts
  const parts = rawValue.split(',');
  const integerPart = parts[0];
  const decimalPart = parts[1] ? ',' + parts[1] : '';

  // Add period separators for thousands in the integer part
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return formattedIntegerPart + decimalPart;
}

// Watch inputValue and emit the formatted value as a number
watch(inputValue, (newVal) => {
  const cleanedValue = newVal.replace(/\./g, '').replace(',', '.'); // Convert back to number-friendly format
  emits('update:modelValue', cleanedValue ? parseFloat(cleanedValue) : null);
});

// Watch for changes in the modelValue prop to keep inputValue in sync
watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal !== null ? formatNumber(newVal.toString()) : '';
  },
  { immediate: true }
);
</script>

<template>
  <q-input
    type="text"
    v-model="inputValue"
    outlined
    class="search-input"
    dense
    lazy-rules
    hide-bottom-space
    :placeholder="placeholder"
    @keydown="$event.key === '-' ? $event.preventDefault() : null"
  />
</template>
