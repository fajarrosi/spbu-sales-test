<script lang="ts" setup>
import { useField } from 'vee-validate';
import { toRef } from 'vue';
import JobTitle, { TJobTitleLookup } from './JobTitleLookup.vue';
import { QFieldProps } from 'quasar';

interface Props {
  name: string;
  qFieldProps?: Partial<QFieldProps>;
}

const props = withDefaults(defineProps<Props>(), { qFieldProps: () => ({}) });

const field = useField<TJobTitleLookup>(toRef(props, 'name'));
</script>

<template>
  <JobTitle
    v-model="field.value.value"
    :q-field-props="{
      errorMessage: field.errorMessage.value,
      error: Boolean(field.meta.touched && field.errorMessage.value),
      ...qFieldProps,
    }"
  />
</template>
