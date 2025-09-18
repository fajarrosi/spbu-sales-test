<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import productHandler from 'api/master/product';
import type { productModel } from 'master/product/useProduct';
import { formatRibuan } from 'methods/general';

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const detailData = ref<productModel>();

onMounted(async () => {
  loading.value = true;
  try {
    const response: any = await productHandler.detail(route.params.id as string);
    detailData.value = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

const goBack = () => {
  router.go(-1);
};
</script>
<template>
  <q-page class="py-6 ml-6 mr-8">
    <q-breadcrumbs separator=">" class="mb-6">
      <q-breadcrumbs-el label="Home" style="color: #707070" class="cursor-pointer" @click="goBack" />
      <q-breadcrumbs-el label="View Detail" style="color: #ed4c4d" />
    </q-breadcrumbs>
    <app-container-card>
      <div class="p-6 flex flex-col gap-y-6">
        <div class="tx-title-3 font-semibold">Product</div>
        <app-loading-state v-if="loading" />
        <div v-else>
          <div class="grid grid-cols-3 gap-8">
            <!-- <div class="flex flex-col gap-y-1 grow col-span-3">
              <div class="tx-caption text-neutral-70">Profile Photo</div>
              <img
                :src="detailData?.image_url || getImage('/default-photo-employee.png')"
                class="rounded-xl w-40 h-40"
              />
            </div> -->
            <div class="flex flex-col gap-y-1 grow">
              <div class="tx-caption-1 text-neutral-70">Product Name</div>
              <div class="tx-body-3">{{ detailData?.pro_name }}</div>
            </div>
            <div class="flex flex-col gap-y-1 grow">
              <div class="tx-caption-1 text-neutral-70">ID Product</div>
              <div class="tx-body-3">{{ detailData?.pro_id }}</div>
            </div>
            <div class="flex flex-col gap-y-1 grow">
              <div class="tx-caption-1 text-neutral-70">Harga Jual Per Liter</div>
              <div class="tx-body-3">Rp {{ formatRibuan(detailData?.pro_price ?? 0) }}</div>
            </div>
            <div class="flex flex-col gap-y-1 grow">
              <div class="tx-caption-1 text-neutral-70">Harga Beli Per Liter</div>
              <div class="tx-body-3">Rp {{ formatRibuan(detailData?.pro_buyprice ?? 0) }}</div>
            </div>
            <div class="flex flex-col gap-y-1 grow">
              <div class="tx-caption-1 text-neutral-70">Keuntungan Per Liter</div>
              <div class="tx-body-3">
                Rp {{ formatRibuan((detailData?.pro_price ?? 0) - (detailData?.pro_buyprice ?? 0)) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-container-card>
  </q-page>
</template>
