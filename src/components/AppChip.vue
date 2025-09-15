<template>
  <div
    class="tx-caption-1 w-fit flex items-center font-medium"
    :class="[backgroundColor, textColor, padding, rounded]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  bgColor: {
    type: String,
    default: () => 'semantic-blue-10',
  },
  color: {
    type: String,
    default: () => 'semantic-blue-80',
  },
  padding: {
    type: String,
    default: () => 'py-1 px-2',
  },
  rounded: {
    type: String,
    default: () => 'rounded-3xl',
  },
});

const backgroundColor = computed<string>(() => `bg-${props.bgColor}`);

const textColor = computed<string>(() => `text-${props.color}`);
</script>
