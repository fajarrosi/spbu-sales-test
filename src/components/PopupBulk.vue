<template>
  <transition appear enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <div class="popup-bulk-action bg-white rounded-2xl border border-primary-red-20 pl-8 flex" v-if="showPopup">
      <div class="flex gap-x-4 items-center mr-8 py-8 min-w-[380px] justify-between">
        <div class="flex gap-x-4 items-center" v-if="showSelected">
          <div class="font-semibold tx-title-1 text-primary-red-80">
            {{ totalSelected }}
          </div>
          <div class="text-neutral-70 tx-body-3">{{ title }} selected</div>
        </div>
        <slot></slot>
      </div>
      <app-button
        v-if="showCloseButton"
        bg-color="white"
        padding="px-8"
        class="border-l-2 border-primary-red-20 close"
        border-radius="rounded-none"
        @click="onhidePopup"
      >
        <div class="flex flex-center">
          <q-icon name="close" class="text-[20px] text-neutral-70" />
        </div>
      </app-button>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps({
  showPopup: {
    type: Boolean,
    default: () => false,
  },
  totalSelected: {
    type: Number,
  },
  title: {
    type: String,
  },
  showSelected: {
    type: Boolean,
    default: () => true,
  },
  showCloseButton: {
    type: Boolean,
    default: () => true,
  },
});
const emits = defineEmits(['update:showPopup', 'onDelete', 'onNullSelected']);
const onhidePopup = () => {
  emits('update:showPopup', false);
  emits('onNullSelected');
};
</script>
