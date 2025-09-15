/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import useAddSKU from './useAddSKU';
import { errorNotify, successNotify } from 'src/methods/useNotify';
import createOrder from 'src/api/sales/createOrder';
import { useRouter } from 'vue-router';
import { getImage } from 'src/methods/general';
import useOrderList from './useOrderList';
import updateOrder from 'src/api/sales/updateOrder';
import getValidasiOrder from 'src/api/sales/getValidasiOrder';
import getValidasiOrderDetail, { TValidasiOrderDetailResponse } from 'src/api/sales/getValidasiOrderDetail';
import { Nullable } from 'src/types';
import { scyllaApi } from 'boot/axios';
import { IDetailOrder } from 'src/api/sales/getOrderDetail';

const useAddOrder = defineStore('ADD_ORDER', () => {
  const orderStore = useOrderList();
  const skuStore = useAddSKU();
  const router = useRouter();

  const isDialogConfirm = ref(false);
  const dataDialogConfirm = ref<any>();

  const isDialogSuccess = ref(false);
  const dataDialogSuccess = ref<any>();

  const isLoadingAction = ref(false);

  const salesman_id = ref(0);
  const selectedSalaesman = ref<{
    details: Record<'brand' | 'product_line' | 'sub_brand', Array<{ ref_id: number }>>;
  } | null>(null);
  const outlet_id = ref(0);
  const ro_date = ref('');
  const due_date = ref('');
  const delivery_date = ref('');
  const pay_type = ref(0);
  const wh_id = ref(0);

  const selectedSalesmanQuery = computed(() => {
    if (!selectedSalaesman.value || !selectedSalaesman.value.details) {
      return '';
    }

    const brand = (selectedSalaesman.value.details.brand ?? [])
      .map((item) => {
        return item.ref_id;
      })
      .join(',');

    const productLine = (selectedSalaesman.value.details.product_line ?? [])
      .map((item) => {
        return item.ref_id;
      })
      .join(',');

    const subBrand = (selectedSalaesman.value.details.sub_brand ?? [])
      .map((item) => {
        return item.ref_id;
      })
      .join(',');

    return [`brand_id=${brand}`, `pl_id=${productLine}`, `sbrand1_id=${subBrand}`].join('&');
  });

  const isLoadingDetailValidasiOrder = ref<boolean>(false);

  const detailValidasiOrder = ref<Nullable<TValidasiOrderDetailResponse['data']>>(null);

  const total_value = computed(() => {
    const total_net = productSales.value.map((item: any) => (item.amount / (item.vat + 100)) * 100);

    return Math.ceil(total_net.reduce((acc: any, curr: number) => acc + curr, 0));
  });

  const total_gross = computed(() => productSales.value.reduce((acc: number, curr: any) => acc + curr.amount, 0));

  const productSales = ref<any>([]);
  const productFinal = ref<any>([]);

  const isDialogTable = ref(false);
  const dataDialogTable = ref();

  const onReset = () => {
    salesman_id.value = 0;
    outlet_id.value = 0;
    ro_date.value = '';
    due_date.value = '';
    delivery_date.value = '';
    pay_type.value = 0;
    wh_id.value = 0;
    productSales.value = [];
    productFinal.value = [];
    selectedSalaesman.value = null;
  };

  const validateInput = () => {
    if (!salesman_id.value) return 'Salesman wajib diisi';
    if (!outlet_id.value) return 'Outlet wajib diisi!';
    if (!ro_date.value) return 'Order Date wajib diisi!';
    if (!due_date.value) return 'Due Date wajib diisi!';
    if (!delivery_date.value) return 'Delivery Date wajib diisi!';
    if (!pay_type.value) return 'Payment wajib diiisi!';
    if (productSales.value.length == 0) return 'Product harus terisi!';
  };

  const onProcessOrder = async () => {
    isLoadingAction.value = true;
    const error = validateInput();
    if (error) {
      isDialogConfirm.value = false;
      return errorNotify(error);
    }
    try {
      isLoadingAction.value = true;
      const payload = {
        mobile_id: 1,
        data_status: 2,
        disc: 0,
        disc_value: 0,
        promo_value: 0,
        cash_disc_value: 0,
        tot_disc1: 0,
        tot_disc2: 0,
        vat: 11,
        vat_value: total_gross.value - total_value.value,
        total: total_gross.value,
        salesman_id: salesman_id.value,
        outlet_id: outlet_id.value,
        ro_date: ro_date.value.split('/').reverse().join('-'),
        due_date: due_date.value.split('/').reverse().join('-'),
        delivery_date: delivery_date.value.split('/').reverse().join('-'),
        pay_type: pay_type.value,
        sub_total: total_value.value,
        wh_id: wh_id.value,
        details: { normal: productSales.value, promo: null },
      };

      const res = await createOrder(payload);

      if (res.data.data.ro_no) {
        router.push(`/detail-order/${res.data.data.ro_no}`);
      } else {
        router.push({ name: 'Order List' });
      }
      successNotify('New Order successfully added');
    } catch (error) {
      console.log(error);
    } finally {
      isDialogConfirm.value = false;
      isLoadingAction.value = false;
    }
  };

  const validateOrder = (cb: () => void) => async () => {
    try {
      isLoadingAction.value = true;

      const res = await getValidasiOrder({
        product: (productSales.value ?? []).map(
          (product: { pro_id: number; qty1: number; qty2: number; qty3: number }) => ({
            pro_id: product.pro_id,
            qty1: product.qty1,
            qty2: product.qty2,
            qty3: product.qty3,
          })
        ),
        outlet_id: outlet_id.value,
        wh_id: wh_id.value,
        total: total_gross.value,
      });

      if (!res.data.data.validate1_success) {
        errorNotify(res.data.data.validate1_message);
      } else {
        cb();
      }
    } catch (error) {
      errorNotify('Failed to validate order');
    } finally {
      isLoadingAction.value = false;
    }
  };

  const validasiOrderDetail = async () => {
    try {
      isLoadingDetailValidasiOrder.value = true;

      const res = await getValidasiOrderDetail({ outlet_id: outlet_id.value });

      detailValidasiOrder.value = res.data.data;
    } catch (error) {
      errorNotify('Failed to get validate order detail');
    } finally {
      isLoadingDetailValidasiOrder.value = false;
    }
  };

  const onDeleteProduct = () => {
    productSales.value = productSales.value.filter((i: any) => i.pro_id !== dataDialogConfirm.value.id);
    successNotify('SKU successfully removed');
    isDialogConfirm.value = false;
  };

  const onShowConfirm = (type: string, obj?: any) => {
    dataDialogConfirm.value = '';
    switch (type) {
      case 'deleteSKU':
        dataDialogConfirm.value = {
          header: 'Remove SKU',
          icon: getImage('table/TrashSimpleSolid.svg'),
          desc: `Are you sure want to remove <strong>${obj.pro_name}</strong> from order list?`,
          id: obj.pro_id,
          submit: onDeleteProduct,
        };
        isDialogConfirm.value = true;
        break;

      case 'addOrder':
        dataDialogConfirm.value = {
          header: 'Add New Order',
          desc: 'Are you sure want to process new order?',
          icon: getImage('Plus.svg'),
          // submit: onProcessOrder,
          submit: validateOrder(onProcessOrder),
        };
        isDialogConfirm.value = true;
        break;

      case 'cancelOrder':
        dataDialogConfirm.value = {
          header: 'Generate Sales Order',
          desc: `Are you sure you want to Cancel Sales Order <strong>${orderStore.detail?.ro_no}</strong>`,
          icon: getImage('Receipt.svg'),
          submit: onCancelOrder,
        };
        isDialogConfirm.value = true;
        break;

      case 'updateOrder':
        dataDialogConfirm.value = {
          header: 'Generate Sales Order',
          desc: 'Are you sure you want to Generate Sales Order? <br/> <strong>The order quantity will be adjusted according to the available stock.</strong>',
          textSubmit: 'Generate Sales Order',
          icon: getImage('Receipt.svg'),
          submit: validateOrder(onUpdateOrder),
        };
        isDialogConfirm.value = true;
        break;

      default:
        dataDialogConfirm.value = {
          header: 'Confirmation',
          desc: 'Do you want to complete this order list? The Order List marked as Completed cannot be modified',
          icon: getImage('table/PencilSimpleLine.svg'),
          submit: onCompletedOrder,
        };
        isDialogConfirm.value = true;
    }
  };

  const payloadUpdateProcessOrder = (status: number) => {
    const payload = {
      ...orderStore.detail,
      data_status: status,
      total: total_gross.value,
      sub_total: total_value.value,
      order_no: orderStore.detail?.order_no,
      vat_value: total_gross.value - total_value.value,
      details: { normal: productSales.value, promo: null },
      due_date: orderStore.detail?.due_date.slice(0, 10),
    };
    return payload;
  };

  const onUpdateOrder = async () => {
    isLoadingAction.value = true;
    const payload = payloadUpdateProcessOrder(2); // PROCESSED STATUS
    try {
      await updateOrder(orderStore.detail.ro_no, payload);
      isDialogConfirm.value = false;
      setTimeout(() => {
        isDialogSuccess.value = true;
        dataDialogSuccess.value = {
          desc: `<div class="font-medium text-center">Sales order has been generated <br/> <span class="font-normal text-lg"> No. ${orderStore.detail.ro_no}</span></div>`,
          notif: 'Sales Order successfully generated',
        };
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      isDialogConfirm.value = false;
      isLoadingAction.value = false;
    }
  };

  const onCompletedOrder = async () => {
    isLoadingAction.value = true;
    const payload = payloadUpdateProcessOrder(7); // COMPLETED STATUS
    try {
      await updateOrder(orderStore.detail.ro_no, payload);
      isDialogConfirm.value = false;
      router.go(0);
      setTimeout(() => {
        successNotify('Final Order successfully completed');
      }, 1500);
    } catch (error) {
      console.log(error);
    } finally {
      isDialogConfirm.value = false;
      isLoadingAction.value = false;
    }
  };

  const onCancelOrder = async () => {
    isLoadingAction.value = true;
    const payload = payloadUpdateProcessOrder(9); // CANCEL STATUS
    try {
      await updateOrder(orderStore.detail.ro_no, payload);
      isDialogConfirm.value = false;
      setTimeout(() => {
        isDialogSuccess.value = true;
        dataDialogSuccess.value = {
          desc: '<span class="font-medium">Sales order has been cancelled</span>',
          notif: 'Sales Order successfully cancelled',
        };
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      isDialogConfirm.value = false;
      isLoadingAction.value = false;
    }
  };

  const getSalesman = async (data: IDetailOrder) => {
    const salesman = await scyllaApi.get(`master/v1/salesman/${data.salesman_id}`);

    if (salesman.data.data) {
      selectedSalaesman.value = salesman.data.data as unknown as typeof selectedSalaesman.value;
    }
  };

  watch([outlet_id], skuStore.focusProduct);

  return {
    isDialogConfirm,
    dataDialogConfirm,

    isDialogSuccess,
    dataDialogSuccess,

    isLoadingAction,

    salesman_id,
    getSalesman,
    selectedSalaesman,
    selectedSalesmanQuery,
    outlet_id,
    ro_date,
    due_date,
    delivery_date,
    pay_type,
    wh_id,
    total_value,

    productSales,
    productFinal,

    isDialogTable,
    dataDialogTable,

    onShowConfirm,
    onDeleteProduct,
    validasiOrderDetail,
    isLoadingDetailValidasiOrder,
    detailValidasiOrder,

    onReset,
  };
});

export default useAddOrder;
