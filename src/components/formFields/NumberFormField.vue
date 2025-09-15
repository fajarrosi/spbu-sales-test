<script lang="ts" setup>
import { QInputProps } from 'quasar';
import { useField } from 'vee-validate';
import { toRef, watch } from 'vue';

interface Props {
  name: string;
  placeholder?: string;
  maxValue?: number;
}

const emits = defineEmits<{
  (e: 'onValueChange', value: unknown): void;
}>();

const props = withDefaults(defineProps<Props>(), { maxValue: 100 });

const field = useField(toRef(props, 'name'));

const handleInput: QInputProps['onUpdate:modelValue'] = (value) => {
  const numValue = Number(value);
  if (numValue > props.maxValue) {
    field.value.value = props.maxValue;
  } else if (numValue < 0) {
    field.value.value = 0;
  } else {
    field.value.value = value;
  }
};

watch(field.value, (value) => {
  emits('onValueChange', value);
});
</script>

<template>
  <q-input
    type="number"
    :model-value="field.value.value as string"
    outlined
    class="search-input"
    dense
    lazy-rules
    hide-bottom-space
    :placeholder="placeholder"
    @keydown="$event.key === '-' ? $event.preventDefault() : null"
    @update:model-value="handleInput"
    :error-message="field.errorMessage.value"
    :error="Boolean(field.meta.touched && field.errorMessage.value)"
  />
</template>
