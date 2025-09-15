/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

import getOrderList, { IOrder } from 'src/api/sales/getOrderList';
import { ListResponse } from 'src/interface/listResponse';
import { debounce } from 'quasar';
import useAddOrder from './useAddOrder';
import getDetailOrder from 'src/api/sales/getOrderDetail';
import { errorNotify } from 'src/methods/useNotify';

type IOption = {
  label: string;
  value: number;
  id?: number;
};

const useOrderList = defineStore('ORDER_LIST', () => {
  const addStore = useAddOrder();
  const detail = ref();

  const isNotEmpty = ref(true);
  const data = ref<ListResponse<IOrder> | null>();
  const loading = ref(false);

  const search = ref('');
  const startDate = ref('');
  const endDate = ref('');
  const salesman = ref([]);
  const outlet = ref([]);
  const status = ref<IOption[]>([]);
  const isInvoice = ref<boolean>(false);

  const page = ref(1);
  const limit = ref(20);

  const convertDate = (dateString: string) => {
    const parts = dateString.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    const mmddyyyy = `${month}/${day}/${year}`;
    return mmddyyyy;
  };

  const queryParams = () => {
    const params: Record<string, string | number | boolean> = {
      page: page.value,
      limit: limit.value,
    };

    if (startDate.value && endDate.value) {
      params.ro_date_from = Date.parse(convertDate(startDate.value)) / 1000 + 25200;
      params.ro_date_to = Date.parse(convertDate(endDate.value)) / 1000 + 25200 + 86399;
    }

    if (salesman.value.length > 0) {
      params.salesman_id = salesman.value.map((i: IOption) => i.value).join(',');
    }

    if (outlet.value.length > 0) {
      params.outlet_id = outlet.value.map((i: IOption) => i.value).join(',');
    }

    if (status.value.length > 0) {
      params.status = status.value.map((i: IOption) => i.id).join(',');
    }

    if (search.value) {
      params.q = search.value;
    }

    if (isInvoice.value) {
      params.is_invoice = isInvoice.value;
    }
    return params;
  };

  const fetchData = async (params: any) => {
    try {
      data.value = null;
      loading.value = true;
      const resp = await getOrderList({ params });
      data.value = resp.data;
      isNotEmpty.value = !!resp.data.data;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  const onSetTableProduct = (val: any) => {
    const promo = (val.promo ?? []).map((item: Record<string, unknown>) => ({ ...item, is_promo: true }));
    const normal = val.normal || [];
    return [...normal, ...promo];
  };

  const fetchDetail = async (id: string | string[]) => {
    try {
      loading.value = true;
      const paramsId = String(id);
      const resp = await getDetailOrder(paramsId);
      detail.value = resp.data.data;
      addStore.wh_id = resp.data.data.wh_id;
      addStore.outlet_id = resp.data.data.outlet_id;
      addStore.productSales = onSetTableProduct(detail.value.details);
      addStore.productFinal = onSetTableProduct(detail.value.details_final);
      loading.value = false;

      return resp.data.data;
    } catch (error) {
      errorNotify('Field to get detail data');
    }
  };

  const changeLimit = (amount: number) => {
    limit.value = limit.value + amount;
    page.value = 1;
  };

  const onFilterFetch = () => {
    page.value = 1;
    const params = queryParams();
    fetchData(params);
  };

  const initData = () => {
    const params = queryParams();
    fetchData(params);
  };

  const onColorBadge = (idx: number | string) => {
    if (idx === 'Partial Reject' || idx === 'Rejected' || idx === 'Partial Received') {
      return 'bg-semantic-red-10 text-semantic-red-80';
    }
    switch (idx) {
      case 9:
        return 'bg-semantic-red-10 text-semantic-red-80';
      case 2:
        return 'bg-primary-blue-10 text-primary-blue-80';
      case 3:
        return 'bg-semantic-blue-10 text-semantic-blue-80';
      case 4:
        return 'bg-semantic-brown-10 text-semantic-brown-80';
      case 5:
        return 'bg-semantic-orange-20 text-semantic-orange-90';
      case 6:
        return 'bg-neutral-10 text-neutral-90';
      case 7:
        return 'bg-semantic-green-20 text-semantic-green-80';
      default:
        return 'bg-semantic-yellow-20 text-semantic-yellow-90';
    }
  };

  const onTotalCount = (data: any) => {
    if (data.length > 0) {
      const subtotal = data.reduce(
        (acc: number, row: any) =>
          acc + (row.qty3 * row.sell_price3 + row.qty2 * row.sell_price2 + row.qty1 * row.sell_price1),
        0
      );
      const ppn = data.reduce((acc: number, curr: any) => acc + Number(curr.vat_value), 0);
      const total = subtotal + ppn;

      return { subtotal, ppn, total };
    }
    return { subtotal: 0, ppn: 0, total: 0 };
  };

  watch([search, startDate, endDate, salesman, outlet, status], debounce(onFilterFetch, 100));
  watch([page, limit], debounce(initData, 100));

  return {
    detail,
    loading,
    data,
    isNotEmpty,

    search,
    startDate,
    endDate,
    salesman,
    outlet,
    status,
    isInvoice,

    page,
    limit,

    initData,
    changeLimit,
    onColorBadge,

    onTotalCount,
    fetchDetail,
  };
});

export default useOrderList;
