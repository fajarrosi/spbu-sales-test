import { scyllaApi } from 'boot/axios';
import { success } from 'interface/SuccessResponse';
import { useManageShift } from 'report/manageShift/useManageShift';
import { storeToRefs } from 'pinia';

const store = useManageShift();

const { shiftData } = storeToRefs(store);
export const destroy = async (id: number): Promise<success> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  shiftData.value = shiftData.value.filter((emp) => emp.shift_id !== id);
  return {
    message: 'Sukses',
    request_id: 'asdf',
  };
};
// export const destroy = async (id: number): Promise<success> => {

//   return await scyllaApi.delete(`master/v1/employees/${id}`)
// }
