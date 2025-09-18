import { scyllaApi } from 'boot/axios';
import { success } from 'interface/SuccessResponse';
import type { shiftModel } from 'report/manageShift/useManageShift';
import { useManageShift } from 'report/manageShift/useManageShift';
import { storeToRefs } from 'pinia';

const storeProduct = useManageShift();

const { shiftData } = storeToRefs(storeProduct);
export const update = async (id: number, data: Partial<shiftModel>): Promise<success> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = shiftData.value.findIndex((el: shiftModel) => el.shift_id === id);
  if (index === -1)
    return {
      message: 'Gagal',
      request_id: 'asdf',
    };

  shiftData.value.splice(index, 1, {
    ...shiftData.value[index],
    ...data,
  });

  return {
    message: 'Sukses',
    request_id: 'asdf',
  };
};
// export const update = async (id: number, data: object): Promise<success> => {
//   return await scyllaApi.patch(`master/v1/employees/${id}`, data)
// }
