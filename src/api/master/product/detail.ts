import { scyllaApi } from 'boot/axios';
import type { productModel } from 'master/product/useProduct';
import { useProduct } from 'master/product/useProduct';
import { storeToRefs } from 'pinia';

const store = useProduct();

const { productData } = storeToRefs(store);
export interface Detail {
  message: string;
  data: productModel | undefined;
  request_id: string;
}


export const detail = async (id: string): Promise<Detail> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    message:'ok',
    data : productData.value.find((el:productModel) => el.pro_id === Number(id)),
    request_id : '123fds'
  }
};
// export const detail = async (id: string): Promise<Detail> => {
//   await new Promise(resolve => setTimeout(resolve, 500));
//   return await scyllaApi.get(`master/v1/employees/${id}`).then((res) => res.data);
// };
