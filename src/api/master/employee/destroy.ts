import { scyllaApi } from 'boot/axios'
import { success } from 'interface/SuccessResponse';
import { useEmployee } from 'master/employee/useEmployee';
import { storeToRefs } from 'pinia';

const store = useEmployee();

const { employeesData } = storeToRefs(store);
export const destroy = async (id: number): Promise<success> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  employeesData.value = employeesData.value.filter(emp => emp.emp_id !== id);
  return {
    message: 'Sukses',
    request_id: 'asdf'
  }
}
// export const destroy = async (id: number): Promise<success> => {

//   return await scyllaApi.delete(`master/v1/employees/${id}`)
// }
