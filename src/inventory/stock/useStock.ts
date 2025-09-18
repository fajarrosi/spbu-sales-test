import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface stockModel {
  stock_id: number;
  pro_id: number;
  pro_name: string;
  stock: number;
  updated_at: string;
}

export const useStock = defineStore('stockStore', () => {
  const now = new Date();
  const updated_at = new Date(
    now.getTime() - Math.floor(Math.random() * 1000000000) // random old date
  ).toISOString();
  const stockData = ref<stockModel[]>([
    {
      stock_id: 1,
      pro_id: 1,
      pro_name: 'Pertalite',
      stock: 10000,
      updated_at,
    },
  ]);

  return {
    stockData,
  };
});
