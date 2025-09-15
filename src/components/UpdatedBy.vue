<template>
  <div class="flex flex-col gap-y-1">
    <div class="capitalize">{{ user }}</div>
    <div class="update-by">
      {{ date.formatDate(tgl, 'HH:mm, DD MMM YYYY') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { date } from 'quasar';
defineProps({
  user: {
    type: String,
  },
  tgl: {
    type: String,
  },
});
</script>
