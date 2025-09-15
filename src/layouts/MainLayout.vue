<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-white h-[72px] navbar-shadow pl-6">
        <div
          class="cursor-pointer relative-position"
          v-ripple="{ color: 'indigo-10', early: true }"
          @click="miniMode = !miniMode"
        >
          <q-icon name="menu" class="text-neutral-90" size="24px" />
        </div>
        <q-space />
        <div class="flex mr-5 gap-x-4">
          <!-- <app-button bg-color="white" padding="p-3">
            <img
              :src="getImage('navbar/MagnifyingGlass.svg')"
              alt="icon-magnifying-glass"
              class="neutral-90-svg w-6 h-6"
            />
          </app-button>
          <app-button bg-color="white" padding="p-3">
            <img :src="getImage('navbar/Bell.svg')" alt="icon-bell" />
          </app-button> -->

          <!-- <div style="border-right: 2px solid #eaeaea" class="h-[48px]"></div> -->
          <app-button border-radius="rounded-3xl" bg-color="primary-red-20" padding="p-2" color="neutral-90">
            <div class="flex gap-x-3 items-center">
              <q-avatar size="32px" font-size="14px" text-color="white" class="bg-primary-red-80 font-semibold">
                {{ getFullname().charAt(0) }}
              </q-avatar>
              <div class="font-medium">{{ getFullname() }}</div>
              <q-icon name="expand_more" class="text-primary-red-60 mr-2 font-extrabold" size="18px" />
            </div>
            <q-menu class="submenu-table">
              <q-list style="min-width: 150px">
                <q-item clickable v-close-popup @click="clickLogout">
                  <q-item-section>
                    <div class="flex gap-x-3">
                      <div class="tx-body-3 font-medium text-neutral-70">Logout</div>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </app-button>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      :model-value="true"
      show-if-above
      :width="280"
      class="bg-primary-blue-100"
      :mini="miniMode"
      :mini-width="72"
    >
      <div class="sidebar">
        <div class="text-white pt-8" :class="miniMode ? 'px-4 pb-[48px]' : 'pb-8 pl-8'">SPBU Sales</div>
        <q-scroll-area class="fit" dark>
          <q-list class="rounded-borders flex flex-col pb-8" :class="miniMode ? 'mx-3 gap-y-2' : 'mx-4 gap-y-4'">
            <div v-for="{ title, icon, active, isSubmenu, expansion } in Menus" :key="title">
              <SubMenuComp
                v-if="isSubmenu"
                v-bind="{
                  miniMode,
                  title,
                  icon: getImage(`sidebar/${icon}.svg`),
                  active,
                  expansion,
                }"
              />
              <MenuComp
                v-else
                v-bind="{
                  miniMode,
                  title,
                  icon: getImage(`sidebar/${icon}.svg`),
                  active,
                }"
              />
            </div>
          </q-list>
        </q-scroll-area>
      </div>
    </q-drawer>

    <q-page-container class="bg-dashboard">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, watch, onMounted } from 'vue';
import { getImage } from 'methods/general';
import { Menus, SubMenus } from 'src/components/menus';
import { useRoute, useRouter } from 'vue-router';
import { useLogin } from 'stores/useLogin';

const SubMenuComp = defineAsyncComponent(() => import('src/components/menus/SubMenuComp.vue'));
const MenuComp = defineAsyncComponent(() => import('src/components/menus/MenuComp.vue'));
const miniMode = ref(false);

const getLogoImage = () => {
  return getImage(`sidebar/${miniMode.value ? 'logo' : 'logo-name'}.svg`);
};

const route = useRoute();

watch(
  () => route,
  () => {
    changeActiveStateMenu();
  },
  { deep: true }
);

/**
 * @description untuk merubah state menu ataupun sub menu
 */
const changeActiveStateMenu = () => {
  if (route.meta.isSubmenu) {
    SubMenus.value = SubMenus.value.map((el) => {
      return {
        ...el,
        subactive: el.subtitle == route.meta.subtitle && el.parent == route.meta.parent ? true : false,
        children: el.children?.map((elChild) => {
          return {
            ...elChild,
            subactive: route.name == elChild.subtitle || route.name == elChild.to ? true : false,
          };
        }),
      };
    });

    Menus.value = Menus.value.map((el) => {
      return {
        ...el,
        active: el.title == route.meta.parent ? true : false,
        expansion: el.title == route.meta.parent ? true : false,
      };
    });
  }
};

/**
 * @description untuk logout
 */
const store = useLogin();
const { deleteUser, getFullname } = store;
const router = useRouter();
const clickLogout = () => {
  deleteUser().then(() => {
    router.push({ name: 'login' });
  });
};

onMounted(() => {
  changeActiveStateMenu();
});
</script>
