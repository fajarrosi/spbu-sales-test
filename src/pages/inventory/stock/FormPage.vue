<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import shiftHandler from 'api/report/manageShift';
import { useGeneralFetch } from 'methods/useGeneralFetch';
import type { shiftModel } from 'report/manageShift/useManageShift';

const router = useRouter();
const route = useRoute();

const loading = ref(false);

const form = ref<shiftModel>({
  shift_id: 0,
  shift_name: '',
  updated_at: new Date().toISOString(),
});

const formImage = ref();

const inputForm = ref();

const titlePage = computed(() => {
  return route.query.id ? 'Edit Shift' : 'Add Shift';
});

const onCancel = () => {
  router.push({ name: 'Manage Shift' });
};

const onSubmitted = async (action?: string) => {
  if (await inputForm.value.validate()) {
    // let requestData = form.value;

    if (route.query.id) {
      // if (formImage.value && typeof formImage.value !== 'string') {
      //   const response = await shiftHandler.upload(formImage.value, null);
      //   requestData.image_url = response.data.data.url;
      // }
      await useGeneralFetch(
        shiftHandler.update(parseInt(route.query.id as string), form.value),
        () => {
          router.push({ name: 'Manage Shift' });
        },
        `Success Update Data Shift ${form.value.shift_name} `
      );
    } else {
      // if (formImage.value && typeof formImage.value !== 'string') {
      //   const response = await shiftHandler.upload(formImage.value, null);
      //   requestData.image_url = response.data.data.url;
      // }
      await useGeneralFetch(
        shiftHandler.create(form.value),
        () => {
          router.push({ name: 'Manage Shift' });
        },
        'Success Create Data Shift'
      );
    }
  }
};

onMounted(async () => {
  loading.value = true;
  if (!route.query.id) {
    loading.value = false;
    return;
  }
  try {
    const response: any = await shiftHandler.detail(route.query.id as string);
    const data = response.data;
    form.value = {
      shift_name: data.shift_name,
      shift_id: data.shift_id,
      updated_at: new Date().toISOString(),
    };
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <q-page class="py-6 ml-6 mr-8">
    <q-dialog :model-value="true" persistent full-height full-width class="dialog-select-invoice">
      <q-card>
        <q-card-section class="p-0">
          <div class="container-select-invoice top-0 z-[2]">
            <div class="flex justify-between">
              <div class="tx-title-3 font-semibold text-neutral-90">
                {{ titlePage }}
              </div>
              <div class="flex flex-col">
                <div class="flex gap-x-4">
                  <app-button
                    class="border border-neutral-20"
                    bg-color="white"
                    color="neutral-90"
                    padding="p-3"
                    @click="onCancel"
                  >
                    Cancel
                  </app-button>
                  <app-button @click="onSubmitted"> Save </app-button>
                </div>
              </div>
            </div>
          </div>

          <app-loading-state v-if="loading" />
          <q-form ref="inputForm" class="px-[80px] py-8" v-else>
            <div class="space-y-7">
              <div class="grid grid-cols-6 gap-4">
                <div class="flex flex-col gap-y-1 grow col-span-4">
                  <div class="tx-caption-1 font-medium text-neutral-90">Shift Name</div>
                  <q-input
                    v-model="form.shift_name"
                    type="text"
                    outlined
                    dense
                    class="search-input"
                    placeholder="Input Shift Name"
                    :rules="[
                      (val: any) => (val && val.length > 0) || 'Shift Name Tidak Boleh Kosong',
                      (val: any) => (val && val.length <= 100) || 'Shift Name Maksimal 100 Karakter',
                    ]"
                  />
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style>
.dialog-select-invoice .q-dialog__inner--minimized {
  padding: 0;
}

.q-dialog__inner > div {
  border-radius: 0;
}

.container-select-invoice {
  background: var(--White, #fff);
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.15);
  padding: 48px 48px 30px;
  position: sticky;
  position: -webkit-sticky;
}

.custom-notif {
  position: sticky;
  position: -webkit-sticky;
  top: 120px;
  right: 3%;
}
</style>
