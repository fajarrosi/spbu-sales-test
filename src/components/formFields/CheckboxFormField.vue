<script lang="ts" setup>
import { useField } from 'vee-validate';
import { toRef } from 'vue';

interface Props {
  name: string;
}

const props = defineProps<Props>();

const field = useField<boolean>(toRef(props, 'name'));
</script>

<template>
  <q-checkbox v-model="field.value.value" />
</template>
