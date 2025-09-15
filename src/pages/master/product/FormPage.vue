<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import productHandler from 'api/master/product';
import { useGeneralFetch } from 'methods/useGeneralFetch';
import type { productModel } from 'master/product/useProduct';

const router = useRouter();
const route = useRoute();

const loading = ref(false);

const form = ref<productModel>({
  pro_id: 0,
  pro_name: '',
  pro_price: 0,
  updated_at: new Date().toISOString(),
});

const formImage = ref();

const inputForm = ref();

const titlePage = computed(() => {
  return route.query.id ? 'Edit Product' : 'Add Product';
});

const onCancel = () => {
  router.push({ name: 'Product' });
};

const onSubmitted = async (action?: string) => {
  if (await inputForm.value.validate()) {
    // let requestData = form.value;

    if (route.query.id) {
      // if (formImage.value && typeof formImage.value !== 'string') {
      //   const response = await productHandler.upload(formImage.value, null);
      //   requestData.image_url = response.data.data.url;
      // }
      await useGeneralFetch(
        productHandler.update(parseInt(route.query.id as string), form.value),
        () => {
          router.push('/master-product');
        },
        `Success Update Data Product ${form.value.pro_name} `
      );
    } else {
      // if (formImage.value && typeof formImage.value !== 'string') {
      //   const response = await productHandler.upload(formImage.value, null);
      //   requestData.image_url = response.data.data.url;
      // }
      await useGeneralFetch(
        productHandler.create(form.value),
        () => {
          router.push({ name: 'Product' });
        },
        'Success Create Data Product'
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
    const response: any = await productHandler.detail(route.query.id as string);
    const data = response.data;
    form.value = {
      pro_name: data.pro_name,
      pro_id: data.pro_id,
      pro_price: data.pro_price,
      updated_at: new Date().toISOString(),
    };
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

const rules = {
  phoneNumber: (val: any) => /^[0-9]+$/.test(val) || 'Harga harus berupa angka',
};
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
                  <div class="tx-caption-1 font-medium text-neutral-90">Product Name</div>
                  <q-input
                    v-model="form.pro_name"
                    type="text"
                    outlined
                    dense
                    class="search-input"
                    placeholder="Input Product Name"
                    :rules="[
                      (val: any) => (val && val.length > 0) || 'Product Name Tidak Boleh Kosong',
                      (val: any) => (val && val.length <= 100) || 'Product Name Maksimal 100 Karakter',
                    ]"
                  />
                </div>

                <div class="flex flex-col gap-y-1 grow col-span-2">
                  <div class="tx-caption-1 font-medium text-neutral-90">Harga Per Liter</div>
                  <q-input
                    v-model="form.pro_price"
                    type="text"
                    outlined
                    dense
                    class="search-input"
                    placeholder="ex : 50000"
                    :rules="[
                      (val: any) => (val && val === 0 || val.length > 0) || 'Harga Per Liter Tidak Boleh Kosong',
                      rules.phoneNumber,
                      (val: any) => (val && val.length <= 15) || 'Harga Per Liter Maksimal 15 Karakter',
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
