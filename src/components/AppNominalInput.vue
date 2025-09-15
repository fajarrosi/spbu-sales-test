<script setup lang="ts">
import { computed } from 'vue';

interface IAppNominalInput {
  value: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
}

const emit = defineEmits(['update:value']);
const props = withDefaults(defineProps<IAppNominalInput>(), {
  value: '',
  placeholder: 'Input Nominal',
  error: false,
  errorMessage: '',
});

const numberSeparate = computed({
  get() {
    return formatNumber(props.value);
  },
  set(value) {
    const number = parseInt(value.replaceAll('.', ''));
    emit('update:value', isNaN(number) ? 0 : number);
  },
});

const formatNumber = (value: string) => {
  const clearDecimal = parseInt(value);
  let numberShowing = String(clearDecimal).replace(/[^\d,]/g, '');
  numberShowing = numberShowing.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return numberShowing;
};
</script>

<template>
  <q-input
    v-model="numberSeparate"
    outlined
    dense
    class="search-input"
    :placeholder="props.placeholder"
    :error-message="props.errorMessage"
    :error="props.error"
    v-bind="$attrs"
  />
</template>
