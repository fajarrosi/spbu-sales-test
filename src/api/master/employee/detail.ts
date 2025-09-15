import { scyllaApi } from 'boot/axios';
import type { employeeModel } from 'master/employee/useEmployee';
import { useEmployee } from 'master/employee/useEmployee';
import { storeToRefs } from 'pinia';

const store = useEmployee();

const { employeesData } = storeToRefs(store);
export interface Detail {
  message: string;
  data: employeeModel | undefined;
  request_id: string;
}


export const detail = async (id: string): Promise<Detail> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    message:'ok',
    data : employeesData.value.find((el:employeeModel) => el.emp_id === Number(id)),
    request_id : '123fds'
  }
};
// export const detail = async (id: string): Promise<Detail> => {
//   await new Promise(resolve => setTimeout(resolve, 500));
//   return await scyllaApi.get(`master/v1/employees/${id}`).then((res) => res.data);
// };
