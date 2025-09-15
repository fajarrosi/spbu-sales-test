<script lang="ts" setup>
import { useField } from 'vee-validate';
import { toRef } from 'vue';
import EmployeeLookup, { TEmployeeLookup } from './EmployeeLookup.vue';
import { QFieldProps } from 'quasar';

interface Props {
  name: string;
  qFieldProps?: Partial<QFieldProps>;
}

const props = withDefaults(defineProps<Props>(), { qFieldProps: () => ({}) });

const field = useField<TEmployeeLookup>(toRef(props, 'name'));
</script>

<template>
  <EmployeeLookup
    v-model="field.value.value"
    :q-field-props="{
      errorMessage: field.errorMessage.value,
      error: Boolean(field.meta.touched && field.errorMessage.value),
      ...qFieldProps,
    }"
  />
</template>
