<script lang="ts" setup>
import { QDateProps, QPopupProxy } from 'quasar';
import { getImage } from 'src/methods/general';
import { useField } from 'vee-validate';
import { ref } from 'vue';
import { toRef } from 'vue';

interface Props {
  name: string;
  dateProps?: Partial<QDateProps>;
}

const props = withDefaults(defineProps<Props>(), { dateProps: () => ({}) });

const dateRef = ref<QPopupProxy | null>(null);

const showStartDate = () => {
  if (dateRef.value) {
    dateRef.value.show();
  }
};

const field = useField(toRef(props, 'name'));
</script>

<template>
  <q-input
    v-model="field.value.value"
    mask="##/##/####"
    outlined
    class="search-input col-span-1 lg:col-span-6"
    dense
    lazy-rules
    hide-bottom-space
    placeholder="Select Date"
    @click="showStartDate"
    :error-message="field.errorMessage.value"
    :error="Boolean(field.meta.touched && field.errorMessage.value)"
  >
    <template v-slot:append>
      <div class="cursor-pointer">
        <img :src="getImage('CalendarBlank.svg')" alt="calendar" />
        <q-popup-proxy cover transition-show="scale" transition-hide="scale" ref="dateRef">
          <q-date v-model="field.value.value" mask="DD/MM/YYYY" v-bind="dateProps">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </div>
    </template>
  </q-input>
</template>
