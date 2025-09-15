<script lang="ts" setup>
import { useField } from 'vee-validate';
import { toRef } from 'vue';

interface Props {
  name: string;
}

const props = defineProps<Props>();

const field = useField(toRef(props, 'name'));
</script>

<template>
  <input type="checkbox" v-model="field.value.value" class="toggle-custom w-[120px]" />
</template>
