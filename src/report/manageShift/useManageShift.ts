import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface shiftModel {
  shift_id: number;
  shift_name: string;
  updated_at: string;
}

export const useManageShift = defineStore('manageShiftStore', () => {
  const now = new Date();
  const updated_at = new Date(
    now.getTime() - Math.floor(Math.random() * 1000000000) // random old date
  ).toISOString();
  const shiftData = ref<shiftModel[]>([
    {
      shift_id: 1,
      shift_name: 'Shift 1',
      updated_at,
    },
    {
      shift_id: 2,
      shift_name: 'Shift 2',
      updated_at,
    },
    {
      shift_id: 3,
      shift_name: 'Shift 3',
      updated_at,
    },
  ]);

  return {
    shiftData,
  };
});
