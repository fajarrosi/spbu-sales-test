<template>
  <q-expansion-item
    expand-separator
    expand-icon-class="text-primary-blue-60 sidebardown"
    class="hover:bg-primary-blue-90 hover:rounded-lg expansion-menu"
    :model-value="expansion"
    @update:model-value="onUpdateExpansion"
    :class="
      expansion
        ? 'bg-primary-blue-90 rounded-lg border border-primary-blue-80'
        : ''
    "
    header-class="p-0"
  >
    <template v-slot:header>
      <q-item-section class="sidebarmenu" :class="miniMode ? '' : 'py-1'">
        <q-tooltip v-if="miniMode">
          {{ title }}
        </q-tooltip>
        <q-item-label>
          <div class="flex items-center">
            <img
              :src="icon"
              alt="icon-menu-sidebar"
              :class="active ? 'semantic-blue-80-svg' : 'white-svg'"
            />
            <div
              :class="
                active ? 'text-white font-medium' : 'text-primary-blue-60'
              "
              class="tx-body-3 ml-3 max-w-[173px]"
              v-if="!miniMode"
            >
              {{ title }}
            </div>
          </div>
        </q-item-label>
      </q-item-section>
    </template>
    <div
      class="bg-primary-blue-100 border border-primary-blue-80 rounded-lg flex flex-col gap-y-2 text-primary-blue-60 tx-body-3 py-2"
    >
    <div
      v-for="(item, index) in SubMenus.filter((el) => el.parent == title)"
      :key="index">
      <div
        v-if="!item.children?.length"
        class="py-2 cursor-pointer hover:bg-primary-blue-90"
        :class="onChangeClass(item.subactive)"
        @click="onClickSubMenu(item)"
      >
        <q-tooltip v-if="miniMode">
          {{ item.subtitle }}
        </q-tooltip>
        {{ getSubtitle(item.subtitle) }}
      </div>

      <div
        v-else
        class="cursor-pointer hover:bg-primary-blue-90">
        <q-list class="sub-submenu">
          <q-expansion-item
            expand-separator
            :content-inset-level="1"
            style="padding-bottom: 0px !important;"
            :class="{['bg-primary-blue-90']: item.subactive}"
            >
            <template v-slot:header>
              <q-item-section :class="[{'active':item.subactive}]">
                <q-item-label>
                  <div class="flex items pl-8 max-h-9">
                    <div
                      :class="
                        item.subactive
                          ? 'text-white font-medium'
                          : 'text-primary-blue-60'
                      "
                      class="tx-body-3 ml-3 max-w-[173px]"
                    >
                      {{ item.subtitle }}
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </template>
            <div
              v-for="(child, index) in item.children"
              :key="index"
              class="p-2"
              :class="
              child.subactive
                ? 'text-white font-medium'
                : 'text-primary-blue-60'
              "
              @click="onClickSubSubMenu(item, child)">
              {{ child.subtitle }}
            </div>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
    </div>
  </q-expansion-item>
</template>

<style lang="scss">
.active {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0.5px;
    top: 0;
    border: 3px solid #ed4c4d;
    bottom: 0;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
}

.sub-submenu {
  .q-item {
    min-height: 36px !important;
    padding: 0px !important;
  }
}

</style>

<script setup lang="ts">
import { SubMenus, Menus } from './';
import { useRouter } from 'vue-router';
import { SubMenuModel } from 'src/models/menu';
const props = defineProps({
  miniMode: {
    type: Boolean,
  },
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
  active: {
    type: Boolean,
  },
  expansion: {
    type: Boolean,
  },
});
const router = useRouter();

const onClickSubMenu = (item: SubMenuModel) => {
  router.push({ name: item.to });
  SubMenus.value = SubMenus.value.map((el) => {
    return {
      ...el,
      subactive:
        el.subtitle == item.subtitle && el.parent == item.parent ? true : false,
      children: el.children?.map((elChild) => {
        return {
          ...elChild,
          subactive: false,
        };
      }),
    };
  });
  Menus.value = Menus.value.map((el) => {
    return {
      ...el,
      active: el.title == props.title ? true : false,
    };
  });
};

const onClickSubSubMenu = (parent: SubMenuModel, child: SubMenuModel) => {
  router.push({ name: child.to });
  SubMenus.value = SubMenus.value.map((el) => {
    return {
      ...el,
      subactive: el.subtitle === parent.subtitle ,
      children: el.children?.map((elChild) => {
        return {
          ...elChild,
          subactive: elChild.subtitle == child.subtitle && el.parent === parent.parent ? true : false,
        };
      }),
    };
  });
};

const onChangeClass = (subactive: boolean): string => {
  let mini = '';
  if (props.miniMode) {
    mini = 'pl-2';
  }
  if (!props.miniMode) {
    mini = 'pl-[44px]';
  }

  let act = '';
  if (subactive) {
    act = 'active bg-primary-blue-90 text-white';
  }
  if (!subactive) {
    act = '';
  }
  return mini + ' ' + act;
};

const getSubtitle = (subtitle: string): string => {
  if (props.miniMode) {
    return subtitle.substring(0, 2);
  }
  return subtitle;
};

const onUpdateExpansion = (value: boolean): void => {
  Menus.value = Menus.value.map((el) => {
    return {
      ...el,
      expansion: el.title == props.title ? value : false,
    };
  });
};
</script>
