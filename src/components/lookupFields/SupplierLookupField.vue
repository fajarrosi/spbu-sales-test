<script lang="ts" setup>
import { useField } from 'vee-validate';
import { toRef } from 'vue';
import SupplierLookup, { TSupplierLookup } from './SupplierLookup.vue';
import { QFieldProps } from 'quasar';

interface Props {
  name: string;
  qFieldProps?: Partial<QFieldProps>;
}

const props = withDefaults(defineProps<Props>(), { qFieldProps: () => ({}) });

const field = useField<TSupplierLookup>(toRef(props, 'name'));
</script>

<template>
  <SupplierLookup
    v-model="field.value.value"
    :q-field-props="{
      errorMessage: field.errorMessage.value,
      error: Boolean(field.meta.touched && field.errorMessage.value),
      ...qFieldProps,
    }"
  />
</template>
