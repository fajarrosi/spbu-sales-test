import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface employeeModel {
  emp_id: number;
  emp_name: string;
  emp_email: string;
  emp_address: string;
  emp_city: string;
  emp_role: string;
  emp_mobile_no: string;
  emp_sex: string;
  emp_religion: string;
  updated_at: string;
}

export const useEmployee = defineStore('employeeStore', () => {
  const employeesData = ref<employeeModel[]>([]);

  const initData = () =>{
    employeesData.value = []
    for (let index = 0; index < 20; index++) {
      const id = index + 1
      employeesData.value.push({
        emp_id: id,
        emp_name: 'employee ke' + id,
        emp_email: `employeke${id}@gmail.com`,
        emp_address: 'addressdfdddf',
        emp_city: 'ciity',
        emp_role: 'Admin',
        emp_mobile_no: '08123555',
        emp_sex: 'Laki-laki',
        emp_religion: 'Islam',
        updated_at : new Date().toISOString()
      })
      
    }
  }
  initData()
  return {
    employeesData,
  };
});