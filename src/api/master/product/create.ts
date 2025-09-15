// import { scyllaApi } from 'boot/axios'
import { success } from 'interface/SuccessResponse';
import type { productModel } from 'master/product/useProduct';
import { useProduct } from 'master/product/useProduct';
import { storeToRefs } from 'pinia';

const store = useProduct();

const { productData } = storeToRefs(store);

export const create = async (data: productModel): Promise<success> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if(productData.value.length == 0){
    productData.value.push({
      ...data,
      pro_id : 1
    })
  }else {
    const lastId = productData.value[productData.value.length - 1].pro_id + 1
    productData.value.push({
      ...data,
      pro_id : lastId
    })
  }
  return {
    message: 'Sukses',
    request_id: 'asdf'
  }
}

// export const create = async (data: object): Promise<success> => {
//   return await scyllaApi.post('master/v1/employees', data)
// }
