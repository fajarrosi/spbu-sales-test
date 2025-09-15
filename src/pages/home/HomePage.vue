<template>
  <div class="h-[92.5vh] my-auto flex flex-col items-center justify-center">
    <div class="text-center space-y-5">
      <img :src="getImage('home-image.png')" alt="home-image" class="mx-auto" />
      <div class="tx-title-2 font-semibold">Welcome to Spbu!</div>
      <div class="max-w-[478px] tx-body-2">
        Spbu is a robust, integrated platform designed to deliver seamless management and control, ensuring
        <span class="text-primary-red-80">efficiency, transparency, and scalability</span> across your entire
        distribution network.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImage } from 'methods/general';
</script>

<style scoped></style>
