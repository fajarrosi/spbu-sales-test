// import { scyllaApi } from 'boot/axios'
import { success } from 'interface/SuccessResponse';
import type { employeeModel } from 'master/employee/useEmployee';
import { useEmployee } from 'master/employee/useEmployee';
import { storeToRefs } from 'pinia';

const store = useEmployee();

const { employeesData } = storeToRefs(store);

export const create = async (data: employeeModel): Promise<success> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if(employeesData.value.length == 0){
    employeesData.value.push({
      ...data,
      emp_id : 1
    })
  }else {
    const lastId = employeesData.value[employeesData.value.length - 1].emp_id + 1
    employeesData.value.push({
      ...data,
      emp_id : lastId
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
