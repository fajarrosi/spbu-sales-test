<template>
  <button
    class="tx-body-3 font-medium cursor-pointer relative-position btn"
    v-ripple
    :class="[backgroundColor, textColor, padding, borderRadius]"
  >
    <q-circular-progress
      indeterminate
      rounded
      size="16px"
      color="inherit"
      class="q-ma-md m-0 !inline-flex !mr-2"
      v-if="loading"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  bgColor: {
    type: String,
    default: () => 'primary-red-80',
  },
  color: {
    type: String,
    default: () => 'white',
  },
  padding: {
    type: String,
    default: () => 'px-6 py-3',
  },
  borderRadius: {
    type: String,
    default: () => 'rounded-lg',
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const backgroundColor = computed<string>(() => `bg-${props.bgColor}`);

const textColor = computed<string>(() => `text-${props.color}`);
</script>
