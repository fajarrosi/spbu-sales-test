<script lang="ts" setup>
import { useField } from 'vee-validate';
import { toRef } from 'vue';
import StaticRadio from '../StaticRadio.vue';
import { watch } from 'vue';

interface Option {
  label: string;
  value: unknown;
}

interface Props {
  name: string;
  placeholder?: string;
}

const emits = defineEmits<{
  (e: 'onValueChange', value: unknown): void;
}>();

const props = defineProps<Props>();

const field = useField(toRef(props, 'name'));

watch(field.value, (value) => {
  emits('onValueChange', value);
});
</script>

<template>
  <q-select
    outlined
    v-model="field.value.value"
    dense
    class="search-input"
    dropdown-icon="expand_more"
    popup-content-class="submenu-status"
    input-class="cursor-pointer disabled:cursor-not-allowed"
    transition-show="scale"
    transition-hide="scale"
    :error-message="field.errorMessage.value"
    :error="Boolean(field.meta.touched && field.errorMessage.value)"
  >
    <template #selected>
      <p :class="[{ 'text-neutral-70': !Boolean((field.value?.value as Option)?.label) }]">
        {{ (field.value?.value as Option)?.label ?? placeholder }}
      </p>
    </template>

    <template v-slot:option="scope">
      <q-item tag="label" :key="scope.opt.label" @click="() => field.handleChange(scope.opt)">
        <q-item-section avatar class="!min-w-0">
          <StaticRadio :selected="(field.value?.value as Option)?.value === scope.opt.value" />
        </q-item-section>
        <q-item-section class="p-0">
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
