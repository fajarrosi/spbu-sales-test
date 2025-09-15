<template>
  <div
    class="flex items-center cursor-pointer hover:bg-primary-blue-90"
    :class="onChangeMode()"
    @click="onClick()"
  >
    <q-tooltip v-if="miniMode">
      {{ title }}
    </q-tooltip>
    <img
      :src="icon"
      alt="icon-menu-sidebar"
      :class="active ? 'semantic-blue-80-svg' : 'white-svg'"
    />
    <div
      class="tx-body-3"
      v-if="!miniMode"
      :class="active ? 'text-white font-medium' : 'text-primary-blue-60'"
    >
      {{ title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Menus, SubMenus } from 'src/components/menus';
const props = defineProps({
  miniMode: {
    type: Boolean,
  },
  active: {
    type: Boolean,
  },
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
});

const onChangeMode = (): string => {
  let mini = '';
  if (props.miniMode) {
    mini = 'p-3';
  }
  if (!props.miniMode) {
    mini = 'px-4 py-3 gap-x-3';
  }

  let act = '';
  if (props.active) {
    act = 'bg-primary-blue-90 rounded-lg border border-primary-blue-80';
  }
  if (!props.active) {
    act = '';
  }
  return mini + ' ' + act;
};

const onClick = (): void => {
  Menus.value = Menus.value.map((el) => {
    return {
      ...el,
      active: el.title == props.title ? true : false,
      expansion: false,
    };
  });
  SubMenus.value = SubMenus.value.map((el) => {
    return {
      ...el,
      subactive: false,
    };
  });
};
</script>
