import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePickList = defineStore('picklist', () => {
  const form = ref({
    documentDate: '',
    salesman: [] as Record<string, any>[],
    outlet: [] as Record<string, any>[],
    assignTo: {} as Record<string, any>,
    vehicle: '',
    helper: '',
    documentType: {},
  });

  const selectedRows = ref<Record<string, any>[]>([]);

  const isFetched = ref(false);

  const resetForm = () => {
    form.value.documentDate = '';
    form.value.salesman = [];
    form.value.outlet = [];
    form.value.assignTo = {};
    form.value.vehicle = '';
    form.value.helper = '';
    form.value.documentType = {};

    selectedRows.value = [];
    isFetched.value = false;
  };

  return {
    form,
    selectedRows,
    resetForm,
    isFetched,
  };
});
