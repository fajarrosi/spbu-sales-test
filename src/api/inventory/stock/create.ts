// import { scyllaApi } from 'boot/axios'
import { success } from 'interface/SuccessResponse';
import type { shiftModel } from 'report/manageShift/useManageShift';
import { useManageShift } from 'report/manageShift/useManageShift';
import { storeToRefs } from 'pinia';

const store = useManageShift();

const { shiftData } = storeToRefs(store);

export const create = async (data: shiftModel): Promise<success> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (shiftData.value.length == 0) {
    shiftData.value.push({
      ...data,
      shift_id: 1,
    });
  } else {
    const lastId = shiftData.value[shiftData.value.length - 1].shift_id + 1;
    shiftData.value.push({
      ...data,
      shift_id: lastId,
    });
  }
  return {
    message: 'Sukses',
    request_id: 'asdf',
  };
};

// export const create = async (data: object): Promise<success> => {
//   return await scyllaApi.post('master/v1/employees', data)
// }
