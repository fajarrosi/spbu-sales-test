<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImage } from 'methods/general';
import employeHandler from 'api/master/employee';
import type { employeeModel } from 'master/employee/useEmployee';

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const detailData = ref<employeeModel>();

onMounted(async () => {
  loading.value = true;
  try {
    const response: any = await employeHandler.detail(route.params.id as string);
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
        <div class="tx-title-3 font-semibold">Employee</div>
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
              <div class="tx-caption-1 text-neutral-70">Employee Name</div>
              <div class="tx-body-3">{{ detailData?.emp_name }}</div>
            </div>
            <div class="flex flex-col gap-y-1 grow">
              <div class="tx-caption-1 text-neutral-70">ID Employee</div>
              <div class="tx-body-3">{{ detailData?.emp_id }}</div>
            </div>
            <div class="flex flex-col gap-y-1 grow">
              <div class="tx-caption-1 text-neutral-70">Email</div>
              <div class="tx-body-3">{{ detailData?.emp_email }}</div>
            </div>
            <div class="flex flex-col gap-y-1 grow">
              <div class="tx-caption-1 text-neutral-70">Sex</div>
              <div class="tx-body-3">{{ detailData?.emp_sex }}</div>
            </div>
            <div class="flex flex-col gap-y-1 grow">
              <div class="tx-caption-1 text-neutral-70">Religion</div>
              <div class="tx-body-3">{{ detailData?.emp_religion }}</div>
            </div>
            <div class="flex flex-col gap-y-1 grow">
              <div class="tx-caption-1 text-neutral-70">phone</div>
              <div class="tx-body-3">{{ detailData?.emp_mobile_no }}</div>
            </div>

            <div class="flex flex-col gap-y-1 grow">
              <div class="tx-caption-1 text-neutral-70">Role</div>
              <div class="tx-body-3">{{ detailData?.emp_role }}</div>
            </div>
            <div class="flex flex-col gap-y-1 grow">
              <div class="tx-caption-1 text-neutral-70">Address</div>
              <div class="tx-body-3">{{ detailData?.emp_address }}</div>
            </div>
            <div class="flex flex-col gap-y-1 grow">
              <div class="tx-caption-1 text-neutral-70">City</div>
              <div class="tx-body-3">{{ detailData?.emp_city }}</div>
            </div>
          </div>
        </div>
      </div>
    </app-container-card>
  </q-page>
</template>
