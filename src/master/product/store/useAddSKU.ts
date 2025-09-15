/* eslint-disable @typescript-eslint/no-explicit-any */
import { scyllaApi } from 'boot/axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IQuantityProduct } from '../interface';
import { errorNotify, successNotify } from 'src/methods/useNotify';
import conversionProduct from 'src/api/sales/conversionProduct';
import getStockProduct from 'src/api/sales/getStockProduct';

import useAddOrder from './useAddOrder';

const useAddSKU = defineStore('ADD_SKU', () => {
  const addStore = useAddOrder();

  const isSKUActive = ref(false);
  const isSKUEdit = ref(false);

  const product_id = ref(0);
  const formProduct = ref();
  const note = ref('');
  const quantity = ref<IQuantityProduct[]>([]);
  const stockProduct = ref();

  const onShow = () => {
    product_id.value = 0;
    note.value = '';
    formProduct.value = '';
    isSKUActive.value = true;
  };

  const onShowEdit = (val: any) => {
    formProduct.value = val;
    quantity.value = [
      { name: val.unit_id3, qty: val.qty3, price_ppn: val.sell_price3, price: val.purch_price3 },
      { name: val.unit_id2, qty: val.qty2, price_ppn: val.sell_price2, price: val.purch_price2 },
      { name: val.unit_id1, qty: val.qty1, price_ppn: val.sell_price1, price: val.purch_price1 },
    ];
    isSKUEdit.value = true;
  };

  const onActionTable = (method: string, val: any) => {
    if (method == 'edit') {
      onShowEdit(val.data);
    } else {
      addStore.onShowConfirm('deleteSKU', val.data);
    }
  };

  const getStock = async (pro_id: string) => {
    const stock = await getStockProduct({ pro_id: pro_id, wh_id: addStore.wh_id.toString() });
    stockProduct.value = stock.data.data[0] as any;
  };

  const onChangeProduct = async (val: any) => {
    formProduct.value = val ?? '';
    quantity.value = [
      { name: val.unit_id3, qty: 0, price_ppn: val.sell_price3, price: val.purch_price3 },
      { name: val.unit_id2, qty: 0, price_ppn: val.sell_price2, price: val.purch_price2 },
      { name: val.unit_id1, qty: 0, price_ppn: val.sell_price1, price: val.purch_price1 },
    ];
  };

  const onPressEnter = async (e: any) => {
    const name = e.target.value.split('-');
    const { data } = await scyllaApi.get(
      `master/v1/products?page=1&limit=70&mode=lookup_dist_price&dist_price_group_id=2&q=${name[1].trimStart()}`
    );
    product_id.value = data.data[0].pro_id;
    onChangeProduct(data.data[0]);
  };

  const onUpdateQuantity = (data: { index: number; value?: any }) => {
    const { index, value } = data;
    quantity.value[index].qty = Number(value);
  };

  const onWrapProductSKU = () => {
    const totalWithoutPPN = quantity.value.reduce((acc: any, curr: any) => {
      const totalProduct = Number(curr.price_ppn) * Number(curr.qty);
      return acc + totalProduct;
    }, 0);
    const totalwithPPN = Math.floor((formProduct.value.vat / 100) * totalWithoutPPN + totalWithoutPPN);
    const product = {
      vat_bg: 0,
      vat_lg_sell: 0,
      vat_bg_value: 0,
      vat_lg_sell_value: 0,
      ...formProduct.value,
      vat_value: totalwithPPN - totalWithoutPPN,
      amount: totalwithPPN,
      notes: note.value,
      qty1: Number(quantity.value[2].qty),
      qty2: Number(quantity.value[1].qty),
      qty3: Number(quantity.value[0].qty),
      // TODO: Backend Not Ready
      item_type: 1, // Product Normal
      disc_value: formProduct.value.disc_value || 0,
      qty1_stok: stockProduct.value.qty1,
      qty2_stok: stockProduct.value.qty2,
      qty3_stok: stockProduct.value.qty3,
    };
    return product;
  };

  const onSave = async () => {
    const isEmptyQty = quantity.value.every((item: IQuantityProduct) => item.qty === 0);
    if (isEmptyQty) return errorNotify('Quantity must be filled');
    const bodyParam = {
      pro_id: formProduct.value.pro_id,
      qty1: quantity.value[2].qty,
      qty2: quantity.value[1].qty,
      qty3: quantity.value[0].qty,
    };
    const res_conv = await conversionProduct(bodyParam);
    quantity.value[0].qty = res_conv.data.data.qty3;
    quantity.value[1].qty = res_conv.data.data.qty2;
    quantity.value[2].qty = res_conv.data.data.qty1;

    const product = onWrapProductSKU();
    stockProduct.value = undefined;
    const findProductTable = addStore.productSales.findIndex((item: any) => item.pro_id === product.pro_id);
    if (findProductTable < 0) {
      addStore.productSales.push(product);
      successNotify('SKU successfully added');
    } else {
      addStore.productSales[findProductTable] = product;
      successNotify('SKU successfully edited');
      isSKUEdit.value = false;
    }

    isSKUActive.value = false;
  };

  const onTabQuantity = (index: number) => {
    if (index == 2) {
      onSave();
    }
  };

  const focusProduct = () => {
    const selectElements = document.getElementsByClassName('productRef');
    if (selectElements.length > 0) {
      const selectInput = selectElements[0].querySelector('input');
      if (selectInput) {
        selectInput.focus();
      }
    }
  };

  const handleDeleteSku = (data: { pro_id: number }) => {
    addStore.productSales = (addStore.productSales ?? []).filter(
      (product: { pro_id: number }) => product.pro_id !== data.pro_id
    );

    isSKUEdit.value = false;
  };

  return {
    isSKUActive,
    isSKUEdit,

    product_id,
    formProduct,
    quantity,
    note,
    stockProduct,

    onShow,
    onShowEdit,

    onPressEnter,
    onChangeProduct,
    onUpdateQuantity,
    onTabQuantity,
    onSave,

    onActionTable,
    getStock,

    focusProduct,

    handleDeleteSku,
  };
});

export default useAddSKU;
