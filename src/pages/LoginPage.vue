<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { showLoading, hideLoading } from 'methods/useLoading';
import { api } from 'boot/axios';
import { useLogin } from 'stores/useLogin';
import { useRouter } from 'vue-router';

const visibility = ref(true);
const form = ref({
  // email: 'dist@sda.idetama.id',
  email: 'admin@localhost.com',
  password: 'admin',
});

const store = useLogin();

const { setUser, getToken } = store;
const router = useRouter();
const onSubmit = () => {
  showLoading();
  setTimeout(() => {
    router.push('/');
    hideLoading();
  }, 300);
  // api
  //   .post('system/v1/users/login', form.value)
  //   .then((res) => {
  //     setUser(res.data.data).then(() => {
  //       router.push('/');
  //       hideLoading();
  //     });
  //   })
  //   .catch(() => {
  //     hideLoading();
  //   });
};

// onBeforeMount(() => {
//   if (getToken()) {
//     router.push('/');
//   }
// });
</script>

<template>
  <q-layout view="lHh LpR lFf">
    <q-drawer :model-value="true" side="left" behavior="desktop" :width="600">
      <div class="p-4">
        <img src="~assets/BgLogin.svg" alt="ilustrasi auth pages" class="object-fill w-full h-[calc(100vh_-_32px)]" />
      </div>
    </q-drawer>

    <q-page-container>
      <q-page>
        <div class="grid grid-rows-[auto_50px] min-h-screen">
          <div class="row items-center ml-[86px]">
            <div class="flex flex-col w-[500px]">
              <div class="flex flex-col mb-[40px]">
                <div class="tx-title-1 font-semibold text-neutral-90 mb-2">Login to your account</div>
                <div class="text-neutral-60 tx-caption-1">Enter using your company email and password</div>
              </div>
              <q-form class="q-gutter-md" @submit="onSubmit">
                <q-input
                  v-model="form.email"
                  type="text"
                  outlined
                  class="search-input"
                  dense
                  placeholder="email"
                  :rules="[(val:any) => (val && val.length > 0) || 'email tidak boleh kosong']"
                  reactive-rules
                >
                  <template v-slot:prepend>
                    <img src="~assets/email.svg" alt="icon-email" class="w-6 h-6" />
                  </template>
                </q-input>
                <q-input
                  v-model="form.password"
                  outlined
                  class="search-input"
                  dense
                  placeholder="password"
                  :rules="[(val:any) => (val && val.length > 0) || 'Password tidak boleh kosong']"
                  reactive-rules
                  :type="visibility ? 'password' : 'text'"
                >
                  <template v-slot:prepend>
                    <img src="~assets/password.svg" alt="icon-password" class="w-6 h-6" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="visibility ? 'visibility' : 'visibility_off'"
                      @click="visibility = !visibility"
                      class="cursor-pointer"
                    />
                  </template>
                </q-input>
                <app-button type="submit" class="w-full">
                  <div>Login</div>
                </app-button>
              </q-form>
            </div>
          </div>
          <div class="text-black-300 flex justify-center">
            Copyright 2025.
            <div class="text-red-500 text-bold">SPBU</div>
            . All Rights Reserved
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
  <!-- <div class="flex flex-center h-screen flex-col">
    <div class="text-bold mb-4">Login</div>
    <q-form class="q-gutter-md" @submit="onSubmit">
      <q-input
        v-model="form.email"
        type="text"
        outlined
        class="search-input"
        dense
        placeholder="email"
        :rules="[
          (val) => (val && val.length > 0) || 'email tidak boleh kosong',
        ]"
        reactive-rules
      />
      <q-input
        v-model="form.password"
        type="password"
        outlined
        class="search-input"
        dense
        placeholder="password"
        :rules="[
          (val) => (val && val.length > 0) || 'Password tidak boleh kosong',
        ]"
        reactive-rules
      />
      <app-button type="submit">
        <div>Login</div>
      </app-button>
    </q-form>
  </div> -->
</template>
