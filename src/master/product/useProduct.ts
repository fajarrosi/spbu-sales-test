import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface productModel {
  pro_id: number;
  pro_name: string;
  pro_price: number;
  updated_at: string;
}

export const useProduct = defineStore('productStore', () => {
  const productData = ref<productModel[]>([]);

  const initData = () =>{
    productData.value = []
    const now = new Date();
    for (let index = 0; index < 20; index++) {
      const id = index + 1
      productData.value.push({
        pro_id: id,
        pro_name: 'Pertamax ke' + id,
        pro_price: 30000 + id,
        updated_at : new Date(
          now.getTime() - Math.floor(Math.random() * 1000000000) // random old date
        ).toISOString()
      })
      
    }
  }
  initData()
  return {
    productData,
  };
});