<template>
  <transition appear enter-active-class="animated fadeInDown">
    <q-table class="app-table" v-bind="$props">
      <template
        v-for="(_, slot) in ($slots as Readonly<QTableSlots>)"
        v-slot:[slot]="scope"
      >
        <slot :name="slot" v-bind="scope || {}"></slot>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </transition>
</template>

<script setup lang="ts">
import type { QTableProps, QTableSlots } from 'quasar';

withDefaults(defineProps<QTableProps>(), {
  flat: true,
  separator: 'none',
  hidePagination: true,
});
</script>
