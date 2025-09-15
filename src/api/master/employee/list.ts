import { scyllaApi } from 'boot/axios'
import { SetDataTable } from 'interface/SetDataTable'
import { SuccessResponseTable } from 'src/interface/SuccessResponseTable'
import { useTable } from 'stores/useTable';
import { useEmployee } from 'master/employee/useEmployee';
import { storeToRefs } from 'pinia';

const storeEmployee = useEmployee();

const { employeesData } = storeToRefs(storeEmployee);

const store = useTable();
const { paginateDummy } = store

const getList = async (query?: string): Promise<SuccessResponseTable> => {
  return await scyllaApi.get(`master/v1/employees${query}`)
    .then(res => res.data)
}

export const list = async (query?: string): Promise<SetDataTable> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  // const { data, paging } = await getList(query)
  // const { page_current: page, page_limit: limit, page_total, total_record } = paging
  return paginateDummy(employeesData.value, query ?? '','emp_name', 'emp_id')
}
