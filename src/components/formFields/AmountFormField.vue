<script lang="ts" setup>
import { useField } from 'vee-validate';
import { watch } from 'vue';
import { toRef } from 'vue';

interface Props {
  name: string;
  placeholder?: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: 'onValueChange', value: unknown): void;
}>();

const field = useField(toRef(props, 'name'));

function formatNumber(value: string): string {
  const rawValue = value.replace(/[^\d,]/g, '');

  if (!rawValue || rawValue === ',') return rawValue;

  const parts = rawValue.split(',');
  const integerPart = parts[0];
  const decimalPart = parts[1] ? ',' + parts[1] : '';

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return formattedIntegerPart + decimalPart;
}

watch(
  () => field.value.value,
  (newValue) => {
    if (typeof field.value.value !== 'undefined') {
      field.value.value = formatNumber(newValue as string);
    }
  }
);

watch(field.value, (value) => {
  emits('onValueChange', value);
});
</script>

<template>
  <q-input
    type="text"
    v-model="field.value.value"
    outlined
    class="search-input"
    dense
    lazy-rules
    hide-bottom-space
    :placeholder="placeholder"
    @keydown="$event.key === '-' ? $event.preventDefault() : null"
    :error-message="field.errorMessage.value"
    :error="Boolean(field.meta.touched && field.errorMessage.value)"
  />
</template>
