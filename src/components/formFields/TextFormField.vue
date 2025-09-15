<script lang="ts" setup>
import { FieldOptions, useField } from 'vee-validate';
import { toRef, watch } from 'vue';

interface Props {
  name: string;
  opts?: Partial<FieldOptions<unknown>>;
}

const props = defineProps<Props>();

const field = useField<string | number | FileList | undefined | null>(toRef(props, 'name'));

const emits = defineEmits<{
  (e: 'onValueChange', value: string | number | FileList | undefined | null): void;
}>();

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
    :error-message="field.errorMessage.value"
    :error="Boolean(field.meta.touched && field.errorMessage.value)"
  />
</template>
