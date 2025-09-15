import { scyllaApi } from 'boot/axios'
import { success } from 'interface/SuccessResponse';
import { useProduct } from 'master/product/useProduct';
import { storeToRefs } from 'pinia';

const store = useProduct();

const { productData } = storeToRefs(store);
export const destroy = async (id: number): Promise<success> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  productData.value = productData.value.filter(emp => emp.pro_id !== id);
  return {
    message: 'Sukses',
    request_id: 'asdf'
  }
}
// export const destroy = async (id: number): Promise<success> => {

//   return await scyllaApi.delete(`master/v1/employees/${id}`)
// }
