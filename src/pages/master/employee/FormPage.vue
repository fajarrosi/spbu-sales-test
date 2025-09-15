<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getImage } from 'methods/general';
import { useRouter, useRoute } from 'vue-router';
import employeHandler from 'api/master/employee';
import { useGeneralFetch } from 'methods/useGeneralFetch';
import type { employeeModel } from 'master/employee/useEmployee';

const router = useRouter();
const route = useRoute();

const loading = ref(false);

const form = ref<employeeModel>({
  emp_id: 0,
  emp_name: '',
  emp_email: '',
  emp_address: '',
  emp_role: '',
  emp_mobile_no: '',
  emp_sex: '',
  emp_religion: '',
  emp_city: '',
  updated_at: new Date().toISOString(),
});

const formImage = ref();

const inputForm = ref();

const titlePage = computed(() => {
  return route.query.id ? 'Edit Employee' : 'Add Employee';
});

const onCancel = () => {
  router.push({ name: 'Employee' });
};

const onChangePhoto = (event: any) => {
  formImage.value = event.target.files[0];
};

const removePhote = () => {
  formImage.value = null;
  // form.value.image_url = '';
};

const photoEmployee = computed(() => {
  if (formImage.value) {
    return URL.createObjectURL(formImage.value as any);
  } else {
    return getImage('default-photo-employee.png');
  }
});

const onSubmitted = async (action?: string) => {
  if (await inputForm.value.validate()) {
    // let requestData = form.value;

    if (route.query.id) {
      // if (formImage.value && typeof formImage.value !== 'string') {
      //   const response = await employeHandler.upload(formImage.value, null);
      //   requestData.image_url = response.data.data.url;
      // }
      await useGeneralFetch(
        employeHandler.update(parseInt(route.query.id as string), form.value),
        () => {
          router.push('/master-employee');
        },
        `Success Update Data Employee ${form.value.emp_name} `
      );
    } else {
      // if (formImage.value && typeof formImage.value !== 'string') {
      //   const response = await employeHandler.upload(formImage.value, null);
      //   requestData.image_url = response.data.data.url;
      // }
      await useGeneralFetch(
        employeHandler.create(form.value),
        () => {
          router.push({ name: 'Employee' });
        },
        'Success Create Data Employee'
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
    const response: any = await employeHandler.detail(route.query.id as string);
    const data = response.data;
    form.value = {
      emp_name: data.emp_name,
      emp_id: data.emp_id,
      emp_email: data.emp_email,
      emp_address: data.emp_address,
      emp_role: data.emp_role,
      emp_mobile_no: data.emp_mobile_no,
      emp_sex: data.emp_sex,
      emp_religion: data.emp_religion,
      emp_city: data.emp_city,
      updated_at: new Date().toISOString(),
    };
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

const rules = {
  phoneNumber: (val: any) => /^[0-9]+$/.test(val) || 'Phone Number harus berupa angka',
};

const optionsSex = [
  { label: 'Laki-laki', value: 'Laki-laki' },
  { label: 'Perempuan', value: 'Perempuan' },
];
const optionsReligion = [
  { label: 'Islam', value: 'Islam' },
  { label: 'Kristen', value: 'Kristen' },
  { label: 'Protestan', value: 'Protestan' },
  { label: 'Hindu', value: 'Hindu' },
  { label: 'Buddha', value: 'Buddha' },
];
const optionsRole = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Guest', value: 'Guest' },
  { label: 'Owner', value: 'Owner' },
];
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
                  <!-- <app-button
                    v-if="!route.query.id"
                    class="border border-neutral-20"
                    bg-color="white"
                    color="neutral-90"
                    padding="p-3"
                    @click="onSubmitted('addMore')"
                  >
                    Save & Add More
                  </app-button> -->
                  <app-button @click="onSubmitted"> Save </app-button>
                </div>
              </div>
            </div>
          </div>

          <app-loading-state v-if="loading" />
          <q-form ref="inputForm" class="px-[80px] py-8" v-else>
            <div class="space-y-7">
              <div class="flex gap-4">
                <div class="relative">
                  <q-icon
                    v-if="formImage"
                    name="close"
                    class="text-neutral-70 cursor-pointer font-semibold bg-white rounded-full p-1 absolute right-2 top-2"
                    size="16px"
                    @click="removePhote"
                    v-close-popup
                  />
                  <img :src="photoEmployee" alt="employee-photo" class="rounded-xl w-40 h-40" />
                </div>
                <div class="space-y-4">
                  <div>
                    <span class="tx-title-3 font-semibold">Photo Profile</span>
                    <span class="text-neutral-70">(optional)</span>
                  </div>
                  <div class="text-neutral-70 text-lg">
                    Images format .jpg, .jpeg, or .png with minimum size 300 x 300 pixels
                  </div>
                  <div
                    class="relative border-2 border-neutral-70 w-fit py-2 px-6 flex gap-2 rounded-md text-neutral-70 overflow-hidden"
                  >
                    <input
                      @change="onChangePhoto"
                      type="file"
                      class="absolute left-0 top-0 h-24 opacity-0"
                      accept="image/jpeg, image/png, image/jpg"
                    />
                    <img :src="getImage('table/UploadSimple.svg')" />
                    <span>Select Photo</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-6 gap-4">
                <div class="flex flex-col gap-y-1 grow col-span-4">
                  <div class="tx-caption-1 font-medium text-neutral-90">Employee Name</div>
                  <q-input
                    v-model="form.emp_name"
                    type="text"
                    outlined
                    dense
                    class="search-input"
                    placeholder="Input Employee Name"
                    :rules="[
                      (val: any) => (val && val.length > 0) || 'Employee Name Tidak Boleh Kosong',
                      (val: any) => (val && val.length <= 100) || 'Employee Name Maksimal 100 Karakter',
                    ]"
                  />
                </div>

                <div class="flex flex-col gap-y-1 grow col-span-2">
                  <div class="tx-caption-1 font-medium text-neutral-90">Email</div>
                  <q-input
                    v-model="form.emp_email"
                    type="text"
                    outlined
                    dense
                    class="search-input"
                    placeholder="ex : name@mail.com"
                    :rules="[
                      (val: any) => (val && val.length > 0) || 'Email Tidak Boleh Kosong',
                      (val: any,rules: any) => rules.email(val) || 'Email Tidak Valid',
                      (val: any) => (val && val.length <= 100) || 'Email Maksimal 100 Karakter',
                    ]"
                  />
                </div>
              </div>

              <div class="grid grid-cols-4 gap-4">
                <div class="flex flex-col gap-y-1 grow">
                  <div class="tx-caption-1 font-medium text-neutral-90">Sex</div>
                  <q-select
                    v-model="form.emp_sex"
                    :options="optionsSex"
                    emit-value
                    map-options
                    :rules="[
                      (val: any) =>
                        (val.length > 0) ||
                        'Sex Tidak Boleh Kosong',
                    ]"
                    outlined
                    dense
                    class="search-input"
                    dropdown-icon="expand_more"
                    popup-content-class="submenu-status"
                    transition-show="scale"
                    transition-hide="scale"
                    lazy-rules
                    hide-bottom-space
                    placeholder="Select Sex"
                    label="Select Sex"
                  />
                </div>

                <div class="flex flex-col gap-y-1 grow">
                  <div class="tx-caption-1 font-medium text-neutral-90">Religion</div>
                  <q-select
                    v-model="form.emp_religion"
                    :options="optionsReligion"
                    emit-value
                    map-options
                    :rules="[
                      (val: any) =>
                        (val.length > 0) ||
                        'Religion Tidak Boleh Kosong',
                    ]"
                    outlined
                    dense
                    class="search-input"
                    dropdown-icon="expand_more"
                    popup-content-class="submenu-status"
                    transition-show="scale"
                    transition-hide="scale"
                    lazy-rules
                    hide-bottom-space
                    placeholder="Select Religion"
                    label="Select Religion"
                  />
                </div>

                <div class="flex flex-col gap-y-1 grow">
                  <div class="tx-caption-1 font-medium text-neutral-90">Phone</div>
                  <q-input
                    v-model="form.emp_mobile_no"
                    type="text"
                    outlined
                    dense
                    class="search-input"
                    placeholder="ex : 0812 3456 7890"
                    :rules="[
                      (val: any) => (val && val === 0 || val.length > 0) || 'Phone Number Tidak Boleh Kosong',
                      rules.phoneNumber,
                      (val: any) => (val && val.length <= 15) || 'Phone Number Maksimal 15 Karakter',
                    ]"
                  />
                </div>
                <div class="flex flex-col gap-y-1 grow">
                  <div class="tx-caption-1 font-medium text-neutral-90">Role</div>
                  <q-select
                    v-model="form.emp_role"
                    :options="optionsRole"
                    emit-value
                    map-options
                    :rules="[
                      (val: any) =>
                        (val.length > 0) ||
                        'Role Tidak Boleh Kosong',
                    ]"
                    outlined
                    dense
                    class="search-input"
                    dropdown-icon="expand_more"
                    popup-content-class="submenu-status"
                    transition-show="scale"
                    transition-hide="scale"
                    lazy-rules
                    hide-bottom-space
                    placeholder="Select Role"
                    label="Select Role"
                  />
                </div>
              </div>

              <div class="grid grid-cols-6 gap-4">
                <div class="flex flex-col gap-y-1 grow col-span-4">
                  <div class="tx-caption-1 font-medium text-neutral-90">Address</div>
                  <q-input
                    v-model="form.emp_address"
                    type="text"
                    outlined
                    dense
                    class="search-input"
                    placeholder="Input Address"
                    :rules="[
                      (val: any) => (val && val.length > 0) || 'Address Tidak Boleh Kosong',
                      (val: any) => (val && val.length <= 100) || 'Address Maksimal 100 Karakter',
                    ]"
                  />
                </div>

                <div class="flex flex-col gap-y-1 grow col-span-2">
                  <div class="tx-caption-1 font-medium text-neutral-90">City</div>
                  <q-input
                    v-model="form.emp_city"
                    type="text"
                    outlined
                    dense
                    class="search-input"
                    placeholder="Input City"
                    :rules="[
                      (val: any) => (val && val.length > 0) || 'City Tidak Boleh Kosong',
                      (val: any) => (val && val.length <= 100) || 'City Maksimal 100 Karakter',
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
