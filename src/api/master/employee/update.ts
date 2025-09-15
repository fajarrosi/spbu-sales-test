import { scyllaApi } from 'boot/axios'
import { success } from 'interface/SuccessResponse';
import { useEmployee } from 'master/employee/useEmployee';
import type { employeeModel } from 'master/employee/useEmployee';
import { storeToRefs } from 'pinia';

const store = useEmployee();

const { employeesData } = storeToRefs(store);
export const update = async (id: number, data: Partial<employeeModel>): Promise<success> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = employeesData.value.findIndex((el:employeeModel) => el.emp_id === id)
  if(index === -1) return {
    message: 'Gagal',
    request_id: 'asdf'
  }

  employeesData.value.splice(index, 1, {
    ...employeesData.value[index],
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
