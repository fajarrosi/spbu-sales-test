import { scyllaApi } from 'boot/axios'
import { success } from 'interface/SuccessResponse';
import type { productModel } from 'master/product/useProduct';
import { useProduct } from 'master/product/useProduct';
import { storeToRefs } from 'pinia';

const storeProduct = useProduct();

const { productData } = storeToRefs(storeProduct);
export const update = async (id: number, data: Partial<productModel>): Promise<success> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = productData.value.findIndex((el:productModel) => el.pro_id === id)
  if(index === -1) return {
    message: 'Gagal',
    request_id: 'asdf'
  }

  productData.value.splice(index, 1, {
    ...productData.value[index],
    ...data
  });
  
  return {
    message: 'Sukses',
    request_id: 'asdf'
  }
}
// export const update = async (id: number, data: object): Promise<success> => {
//   return await scyllaApi.patch(`master/v1/employees/${id}`, data)
// }
