import { scyllaApi } from 'boot/axios';
import type { shiftModel } from 'report/manageShift/useManageShift';
import { useManageShift } from 'report/manageShift/useManageShift';
import { storeToRefs } from 'pinia';

const store = useManageShift();

const { shiftData } = storeToRefs(store);
export interface Detail {
  message: string;
  data: shiftModel | undefined;
  request_id: string;
}

export const detail = async (id: string): Promise<Detail> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    message: 'ok',
    data: shiftData.value.find((el: shiftModel) => el.shift_id === Number(id)),
    request_id: '123fds',
  };
};
// export const detail = async (id: string): Promise<Detail> => {
//   await new Promise(resolve => setTimeout(resolve, 500));
//   return await scyllaApi.get(`master/v1/employees/${id}`).then((res) => res.data);
// };
