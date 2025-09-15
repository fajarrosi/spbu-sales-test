<template>
  <q-page class="py-6 ml-6 mr-8">
    <app-container-card>
      <header-table
        title="Master Product"
        subtitle="Total : 50 Barang"
        chips="50 Product"
        v-model:search="search"
        labelAdd="Add Product"
        @onSetting="settingClick()"
      />
      <div class="table-data" v-if="stateInit == 'table-data'">
        <app-table
          :rows="rows"
          :columns="columns"
          :pagination="{ rowsPerPage: 10 }"
          selection="multiple"
          v-model:selected="selected"
          hide-bottom
          :loading="stateLoadTable"
        >
          <template v-slot:body-cell-product="props">
            <q-td key="product" :props="props">
              <div class="flex flex-col">
                <div class="font-medium text-neutral-90">
                  {{ props.row.nama_product }}
                </div>
                <div class="text-neutral-70">
                  Code : {{ props.row.kode_product }}
                </div>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td key="status" :props="props">
              <app-status-chip :status="props.row.status" />
            </q-td>
          </template>
          <template v-slot:body-cell-updatedby="props">
            <q-td key="updatedby" :props="props">
              <updated-by
                :user="props.row.updated_by"
                :tgl="props.row.updated_at"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td key="action" :props="props">
              <action-table
                :row="props.row"
                @onEdit="onEdit"
                @onDelete="onDelete"
              />
            </q-td>
          </template>
          <template v-slot:header-cell-product="props">
            <q-th key="product" :props="props">
              <app-sort-table
                :label="props.col.label"
                column-sort="product"
                @onSort="onSortTable"
              />
            </q-th>
          </template>
          <template v-slot:header-cell-category="props">
            <q-th key="category" :props="props">
              <app-sort-table
                :label="props.col.label"
                column-sort="category"
                @onSort="onSortTable"
              />
            </q-th>
          </template>
          <template v-slot:header-cell-productline="props">
            <q-th key="productline" :props="props">
              <app-sort-table
                :label="props.col.label"
                column-sort="productline"
                @onSort="onSortTable"
              />
            </q-th>
          </template>
          <template v-slot:header-cell-brand="props">
            <q-th key="brand" :props="props">
              <app-sort-table
                :label="props.col.label"
                column-sort="brand"
                @onSort="onSortTable"
              />
            </q-th>
          </template>
          <template v-slot:header-cell-sub_brand="props">
            <q-th key="sub_brand" :props="props">
              <app-sort-table
                :label="props.col.label"
                column-sort="sub_brand"
                @onSort="onSortTable"
              />
            </q-th>
          </template>
          <template v-slot:header-cell-updatedby="props">
            <q-th key="updatedby" :props="props">
              <app-sort-table
                :label="props.col.label"
                column-sort="updatedby"
                @onSort="onSortTable"
              />
            </q-th>
          </template>
          <template v-slot:header-cell-status="props">
            <q-th key="status" :props="props">
              <app-status-popup
                :label="props.col.label"
                v-model:status="status"
              />
            </q-th>
          </template>
        </app-table>

        <pagination-table
          v-model:limit="limit"
          v-model:page="page"
          v-model:totalPage="totalPage"
        />
      </div>

      <popup-bulk
        v-model:showPopup="showPopup"
        :totalSelected="selected.length"
        @onDelete="onDeleteSelected"
        @onNullSelected="selected = []"
      />

      <app-no-data
        title="No Product Data"
        subtitle="Click “+ Add Product” to add new product"
        v-if="stateInit == 'no-data'"
      />

      <app-loading-state v-if="stateInit == 'loading'" />
    </app-container-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
// import { getImage } from 'methods/general';
import { useRouter } from 'vue-router';

const router = useRouter();
const settingClick = () => {
  router.push({ name: 'Parameter Product' });
};

const columns = ref([
  { name: 'product', align: 'left', label: 'Product Info', field: 'id' },
  { name: 'category', align: 'left', label: 'Category', field: 'category' },
  { name: 'status', align: 'left', label: 'Status', field: 'id' },
  {
    name: 'productline',
    align: 'left',
    label: 'Product Line',
    field: 'product_line',
  },
  { name: 'brand', align: 'left', label: 'Brand', field: 'brand' },
  { name: 'sub_brand', align: 'left', label: 'Sub Brand', field: 'sub_brand' },
  { name: 'updatedby', align: 'left', label: 'Update By', field: 'id' },
  { name: 'action', align: 'left', label: 'Action', field: 'id' },
]);

const rows = ref([
  {
    id: 1,
    nama_product: 'Sunsilk',
    kode_product: '18997014480265',
    category: 'Body Care',
    status: 'active',
    product_line: 'Shampoo',
    brand: 'Sunsilk',
    sub_brand: 'Sunsilk Sachet',
    updated_by: 'admin',
    updated_at: '01/10/24 14:05:55',
  },
  {
    id: 2,
    nama_product: 'Sunsilk',
    kode_product: '18997014480265',
    category: 'Body Care',
    status: 'deactive',
    product_line: 'Shampoo',
    brand: 'Sunsilk',
    sub_brand: 'Sunsilk Sachet',
    updated_by: 'admin',
    updated_at: '01/10/24 14:05:55',
  },
]);

const onEdit = (value: object) => {
  console.log('edit value', value);
};

const onDelete = (value: object) => {
  console.log('delete value', value);
};

const selected = ref([]);
const showPopup = ref(false);

watch(
  () => selected.value,
  (val) => {
    if (val.length > 0) {
      showPopup.value = false;
      setTimeout(() => {
        showPopup.value = true;
      }, 100);
    } else {
      showPopup.value = false;
    }
  }
);

const onDeleteSelected = () => {
  console.log('delete value', selected.value);
};

const stateInit = ref('loading');
onMounted(() => {
  setTimeout(() => {
    stateInit.value = 'table-data';
  }, 1000);
});

const stateLoadTable = ref(false);

const page = ref(1);
const totalPage = ref(5);
watch(
  () => page.value,
  () => {
    getTableData();
  }
);

const limit = ref(10);
watch(
  () => limit.value,
  () => {
    getTableData();
  }
);

const search = ref();
watch(
  () => search.value,
  () => {
    getTableData();
  }
);

const status = ref();
watch(
  () => status.value,
  () => {
    getTableData();
  }
);

const getTableData = () => {
  stateLoadTable.value = true;
  setTimeout(() => {
    stateLoadTable.value = false;
  }, 1000);
};

const onSortTable = (sort: object): void => {
  console.log('sort', sort);
  getTableData();
};
</script>
