<template>
  <transition appear enter-active-class="animated zoomIn">
    <div class="py-[120px] flex flex-center flex-col gap-y-4" :class="[height]">
      <img :src="getImage('table/FilePlus.png')" alt="icon-no-data" />
      <div class="text-neutral-90 font-semibold" :class="[textTitle]">{{ title }}</div>
      <div class="text-neutral-70" :class="[textSubtitle]">
        {{ subtitle }}
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { getImage } from 'methods/general';

interface NoDataProps {
  title?: string;
  subtitle?: string;
  height?: string;
  textTitle?:string;
  textSubtitle?:string;
}

withDefaults(defineProps<NoDataProps>(), {
  title: 'No Data',
  subtitle: 'No Data Available',
  height: 'h-[400px]',
  textTitle: 'tx-title-1',
  textSubtitle: 'tx-body-3',
});
</script>
