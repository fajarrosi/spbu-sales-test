import { scyllaApi } from 'boot/axios';
import { SetDataTable } from 'interface/SetDataTable';
import { SuccessResponseTable } from 'src/interface/SuccessResponseTable';
import { useTable } from 'stores/useTable';
import { useStock } from 'inventory/stock/useStock';
import { storeToRefs } from 'pinia';

const storeProduct = useStock();

const { stockData } = storeToRefs(storeProduct);

const store = useTable();
const { paginateDummy } = store;

// const getList = async (query?: string): Promise<SuccessResponseTable> => {
//   return await scyllaApi.get(`master/v1/employees${query}`)
//     .then(res => res.data)
// }

export const list = async (query?: string): Promise<SetDataTable> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // const { data, paging } = await getList(query)
  // const { page_current: page, page_limit: limit, page_total, total_record } = paging
  return paginateDummy(stockData.value, query ?? '', 'pro_name', 'pro_id');
};
