<template>
  <q-dialog v-model="confirm" persistent>
    <q-card class="crud-dialog" flat>
      <q-card-section class="px-6 py-4 header-crud">
        <div class="flex items-center">
          <div class="flex gap-x-3 items-center grow">
            <div class="p-3 rounded-xl bg-primary-red-20" v-if="iconHeader">
              <img :src="iconHeader" alt="icon-pencilsimple-line" class="primary-red-80-svg" />
            </div>
            <div class="tx-body-2 font-semibold">{{ titleHeader }}</div>
          </div>
          <q-icon name="close" class="text-neutral-70 cursor-pointer font-semibold" size="20px" v-close-popup />
        </div>
      </q-card-section>
      <app-divider class="w-full" />
      <q-form @submit="submitClick" v-if="isForm">
        <slot v-if="isForm"></slot>
        <app-divider class="w-full" />

        <q-card-section class="px-6 py-4 footer-crud flex justify-end gap-x-4">
          <app-button
            @click="onCloseButton"
            class="border border-neutral-20"
            bg-color="white"
            color="neutral-90"
            type="button"
          >
            <div>{{labelCancel}}</div>
          </app-button>
          <app-button type="submit" v-bind="buttonSubmitProps">
            {{ labelSubmit }}
          </app-button>
        </q-card-section>
      </q-form>
      <slot v-else></slot>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false,
  },
  iconHeader: {
    type: String,
  },
  titleHeader: {
    type: String,
  },
  labelSubmit: {
    type: String,
  },
  labelCancel: {
    type: String,
    default: () => 'Cancel',
  },
  isForm: {
    type: Boolean,
    default: () => true,
  },
  buttonSubmitProps: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits(['update:modelValue', 'onSubmit', 'onCancelSubmitApproveWithPropose']);

const confirm = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emits('update:modelValue', newValue);
  },
});

const submitClick = (): void => {
  emits('onSubmit');
};

const onCloseButton = (): void => {
  if (props.titleHeader == 'Approve With Type outlet') {
    emits('onCancelSubmitApproveWithPropose');
  } else {
    emits('update:modelValue', false);
  }
};
</script>
