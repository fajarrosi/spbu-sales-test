<template>
  <div :class="[backgroundColor,height]"></div>
  
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  bgColor: {
    type: String,
    default: () => 'primary-red-20',
  },
  height:{
    type:String, 
    default: () => 'h-px',
  }
});

const backgroundColor = computed<string>(() => `bg-${props.bgColor}`);
</script>
