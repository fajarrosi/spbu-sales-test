<script lang="ts" setup>
import { FieldOptions, useField } from 'vee-validate';
import { toRef, watch } from 'vue';

interface Props {
  name: string;
  opts?: Partial<FieldOptions<unknown>>;
}

const props = defineProps<Props>();

const field = useField<string>(toRef(props, 'name'));

const emits = defineEmits<{
  (e: 'onValueChange', value: string): void;
}>();

watch(field.value, (value) => {
  emits('onValueChange', value);
});
</script>

<template>
  <q-field
    type="text"
    v-model.lazy="field.value.value"
    outlined
    class="search-input"
    dense
    lazy-rules
    hide-bottom-space
    :error-message="field.errorMessage.value"
    :error="Boolean(field.meta.touched && field.errorMessage.value)"
  >
    <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
      <input
        :id="id"
        class="q-field__input text-left"
        :value="modelValue"
        @change="(e) => emitValue((e.target as HTMLInputElement)?.value)"
        v-money="{
          decimal: ',',
          thousands: '.',
          prefix: 'Rp ',
          precision: 0,
        }"
        @keydown="$event.key === '-' ? $event.preventDefault() : null"
        v-show="floatingLabel"
      />
    </template>
  </q-field>
</template>
