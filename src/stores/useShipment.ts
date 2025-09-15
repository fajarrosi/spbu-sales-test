import { ref,computed } from 'vue'
import { defineStore } from 'pinia';
import type { ModelInvoice } from 'api/master/shipment/getdelivery'
import { useGroupBy } from 'methods/useGroupBy';
import type { DetailShipment,detailsInvoice as detailPick } from 'api/master/shipment/detailshipment';
import type { DetailInvoice } from 'api/master/shipment/printPick';
import goodreceiptHandler from 'api/inventory/goodsreceipt';

export const useShipment = defineStore('shipment',() => {
  const method = ref('')
  const deliveryDate = ref('');
  interface anonymousObject {
    [Key: string]: string;
  } 

  const vehicle = ref<anonymousObject | null>(null)

  const vehicleAuto = ref<anonymousObject[]>([])

  const listBadge = ref<string[]>([])

  const setMethod = (value:string) => {
    method.value = value
    deliveryDate.value = ''
    vehicle.value = null
    vehicleAuto.value = []
    listBadge.value = []
  }

  const pending = ref<ModelInvoice[]>([]);
  const delivery = ref<ModelInvoice[]>([]);
  const pickup = ref<ModelInvoice[]>([]);

  const invoiceSelected = computed(()=>{
    return delivery.value.concat(pending.value, pickup.value);
  })

  interface invoiceFlatData {
    order_no: string;
    delivery_date: string;
    invoice_date: string;
    invoice_no: string;
    outlet_code: string;
    outlet_name: string;
    outlet_status: string;
    outlet_address: string;
    outlet_id: string;
    salesman_name: string;
    salesman_id: number;
    total_volume: number;
    total_weight: number;
    status: string;
    product_id: number;
    product_code: string;
    product_name: string;
    qty1: number;
    qty2: number;
    qty3: number;
    unit_id1: string;
    unit_id2: string;
    unit_id3: string;
    conv_unit1: number;
    conv_unit2: number;
    conv_unit3: number;
    sell_price1: number;
    sell_price2: number;
    sell_price3: number;
    sku: string;
    outlet_latitude: string;
    outlet_longitude: string;
    wh_latitude: string;
    wh_longitude: string;
    warehouse_latitude: number;
    warehouse_longitude: number;
  }

  const invoiceFlatData = computed(()=>{
    if(invoiceSelected.value.length > 0){
      const result : invoiceFlatData[] = []
      invoiceSelected.value.forEach((item:ModelInvoice) => {
        const { index,details, ...invoice } = item
        details.forEach((detail:any)=>{
          result.push({
            ...invoice,
            product_id: detail.pro_id || detail.product_id,
            product_code: detail.pro_code || detail.product_code,
            product_name: detail.pro_name || detail.product_name,
            sku:detail.pro_code || detail.product_code,
            ...detail,
            wh_latitude : '-6.1365484',
            wh_longitude : '106.8762755',
            // outlet_latitude : item.outlet_latitude == '' ? '-6.1365484' : item.outlet_latitude,
            // outlet_longitude : item.outlet_longitude == '' ? '106.8762755' : item.outlet_longitude,
            // wh_latitude : item.wh_latitude == '' ? '-6.1365484' : item.wh_latitude,
            // wh_longitude : item.wh_longitude == '' ? '106.8762755' : item.wh_longitude,
          })
        })
      })
      // return result
      return result.map((item:any) => {
        return {
          ...item,
          outlet_latitude : parseFloat(item.outlet_latitude),
          outlet_longitude : parseFloat(item.outlet_longitude),
          // outlet_latitude : parseFloat('-6.1365484'),
          // outlet_longitude : parseFloat('106.8762755'),
          warehouse_latitude : parseFloat('-6.1365484'),
          warehouse_longitude : parseFloat('106.8762755'),
        }
      })
    }else {
      return []
    }
  })

  const invoiceSelectedStep2 = computed(()=>{
    const convertObjectToArray = (data: Record<string, any[]>): any[] => {
      return Object.entries(data).map(([key, value]) => {
        return {
          outlet_code: value[0].outlet_code,
          outlet_name: value[0].outlet_name,
          details: value,
        };
      });
    };

    if(invoiceSelected.value.length > 0){
      return convertObjectToArray(useGroupBy(invoiceFlatData.value, 'outlet_code'))
    }else{
      return []
    }
  })

  const vehiclesList = computed(() => {
    return vehicleAuto.value.length > 0 ? vehicleAuto.value.map((el:any) => {
    //   const warehouseLatitude = invoiceFlatData.value.length > 0 
    //   ? parseFloat(invoiceFlatData.value[0].wh_latitude) || 123 
    //   : 123;
    // const warehouseLongitude = invoiceFlatData.value.length > 0 
    //   ? parseFloat(invoiceFlatData.value[0].wh_longitude) || 123 
    //   : 123;
      return {
        cust_id: localStorage.getItem('cust_id'),
        driver_id: el.driver_id,
        driver_name: el.driver_name,
        height: el.height,
        helper_id: el.helper_id,
        helper_name: el.helper_name,
        length: el.length,
        vehicle_id: el.vehicle_id,
        vehicle_name: el.vehicle_desc,
        vehicle_no: el.vehicle_no,
        vehicle_type: el.vehicle_type_name,
        volume: el.volume,
        warehouse_latitude: parseFloat('-6.1365484'),
        warehouse_longitude: parseFloat('106.8762755'),
        weight: el.weight,
        width: el.width
      }
    }) : []
  })

  const datas = ref<DetailShipment | null>(null);
  
  interface Product {
    product_id: number;
    product_code: string;
    product_name: string;
    qty1: number;
    qty2: number;
    qty3: number;
    qty3Utuh: number;
    Totalqty3: number;
    unit_id1: string;
    unit_id2: string;
    unit_id3: string;
    volume: number;
    weight: number;
  }

  interface Invoice {
    no:number;
    order_no:number;
    invoices_no:number;
    outlet_code:string;
    outlet_name:string;
    invoice_date:string;
    due_date:string;
    total_netto:number;
    total_belum_bayar:number;
    pay_type_name:string;
  }

  interface OutletData {
    outlet_id: number;
    outlets: detailPick[];
  }

  const allProducts = ref<Product[]>([])
  const dataInvoice = ref<DetailInvoice>()
  const allInvoice = computed<Invoice[]>(()=>{
    const result = dataInvoice.value?.invoices ?? []
    return result.filter((item:any) => item.status == 'Delivery').map((item:any,index:number) => {
      return {
        no: index + 1,
        order_no:item.order_no,
        invoices_no:item.invoice_no,
        outlet_code:item.outlet_code,
        outlet_name:item.outlet_name,
        invoice_date:item.invoice_date,
        due_date:item.due_date,
        total_netto:item.total_netto,
        total_belum_bayar:item.total_belum_bayar,
        pay_type_name:item.pay_type_name
      }
    })
  })
  const detailShipment = ref<detailPick[]>([])

  async function convertData(data: OutletData[]) {
    allProducts.value = []
    detailShipment.value = []
    data.forEach((outletObj) => {
      outletObj.outlets.filter((el:any) => el.shipment_status == 'Delivery').forEach((product) => {
        // Check if product with the same product_id already exists in result
        const existingProduct = allProducts.value.find((item) => item.product_id === product.product_id);
        if (!existingProduct) {
          // If not exists, add the product to the result array
          allProducts.value.push(
            { ...product, 
              qty3Utuh: product.qty3, 
              Totalqty3: 0, 
              volume: Math.ceil(product.volume * 1000000),
            });
        } else {
          // If exists, update the quantity and volume of the product
          existingProduct.qty1 += product.qty1;
          existingProduct.qty2 += product.qty2;
          existingProduct.qty3 += product.qty3;
          existingProduct.qty3Utuh += product.qty3;
          existingProduct.volume += Math.ceil(product.volume * 1000000);
          existingProduct.weight += product.weight;
        }
      });

      outletObj.outlets.forEach((product) => {
        detailShipment.value?.push(product)
      })
    });

    allProducts.value.forEach(async (item) => {
      const sendData = {
        pro_id: item.product_id,
        qty1: item.qty1,
        qty2: item.qty2,
        qty3: item.qty3,
      };
      const result = await goodreceiptHandler.conversionqty(sendData);
      item.qty1 = result.qty1;
      item.qty2 = item.unit_id2 == item.unit_id3 ? 0 : result.qty2;
      item.qty3 = item.unit_id2 == item.unit_id3 ? result.qty3 + result.qty2 : result.qty3;
      if (item.qty3 > item.qty3Utuh) {
        item.qty3 = item.qty3 - item.qty3Utuh;
      } else if (item.qty3 == item.qty3Utuh) {
        item.qty3 = 0;
      }
      item.Totalqty3 = item.qty3 + item.qty3Utuh;
    });
  }

  const salesman = ref([])
  const outlet = ref([])
  const showOutlet = ref(true)
  const outletParams = ref('')

  return {
    method,
    setMethod,

    deliveryDate,
    vehicle,

    pending,
    delivery,
    pickup,
    invoiceSelected,
    invoiceSelectedStep2,
    invoiceFlatData,
    vehicleAuto,
    vehiclesList,
    listBadge,

    datas,
    convertData,
    allProducts,
    allInvoice,
    dataInvoice,
    detailShipment,

    salesman,
    outlet,
    showOutlet,
    outletParams
  }
})