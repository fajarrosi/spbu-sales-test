<script setup lang="ts">
import { onMounted, ref } from 'vue';
import productHandler from 'api/master/product';
import { date } from 'quasar';
import { formatRibuan } from 'methods/general';
import { useTable } from 'stores/useTable';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useTable();

const { rows, loading, columns, showDialog, dataDialog, noData, loadingInit, editForm, state, totalRecord } =
  storeToRefs(store);

const { onSortTable, setColumn, setTitleNoData, setHandler, openDialog, onInitData, onSubmitDialog } = store;

// const employeeSelected = ref([]);
setColumn([
  { name: 'employee_info', align: 'left', label: 'Product Info', field: 'id' },
  { name: 'address', align: 'left', label: 'Harga Per Liter', field: 'id' },
  { name: 'action', align: 'left', label: 'Action', field: 'id' },
]);

setTitleNoData('Product');

setHandler(productHandler);

const showDialogUpload = ref(false);

onMounted(() => {
  onInitData(productHandler.list('?page=1&limit=10'));
});

const onClick = ({ row, method = '' }: { row?: any; method: string }) => {
  switch (method) {
    case 'edit':
      router.push({ name: 'Manage Product', query: { id: row?.pro_id } });
      break;
    case 'add':
      router.push({ name: 'Manage Product' });
      break;
    case 'detail':
      router.push({ name: 'Detail Product', params: { id: row?.pro_id } });
      break;
    default: //delete
      openDialog('delete');
      editForm.value = {
        emp_name: row?.emp_name,
        emp_id: row?.emp_id,
      };
      break;
  }
};
const resetForm = () => {
  onInitData(productHandler.list('?page=1&limit=10'));
  editForm.value = {
    emp_name: '',
    emp_id: '',
  };
};
const onSubmit = () => {
  onSubmitDialog(editForm.value.emp_id, editForm.value, resetForm);
};

const handleShowDialogUpload = () => {
  showDialogUpload.value = true;
};
</script>

<template>
  <q-page class="py-6 ml-6 mr-8">
    <app-container-card>
      <header-table
        title="Master Product"
        :chips="`${totalRecord} Product`"
        labelAdd="Add Product"
        :can="['add', 'search']"
        @on-add="
          onClick({
            method: 'add',
          })
        "
        placeholderSearch="Search by name or ID"
      />
      <div class="table-data" v-if="state == 'table-data'">
        <app-loading-state v-if="loadingInit" />
        <div v-else>
          <app-table
            :rows="rows"
            :columns="columns"
            :pagination="{ rowsPerPage: 0 }"
            :loading="loading"
            :no-data-label="noData.title"
            :row-key="(row:any) => row.emp_id"
            :class="rows.length > 0 ? '' : 'pb-4'"
          >
            <template v-slot:body-selection="props">
              <q-checkbox v-model="props.selected" />
            </template>
            <template v-slot:body-cell-employee_info="props">
              <q-td key="employee_info" :props="props">
                <div class="flex gap-x-4">
                  <div class="flex flex-col">
                    <div class="font-medium text-neutral-90">
                      {{ props.row.pro_name }}
                    </div>
                    <div class="text-neutral-70">ID : {{ props.row.pro_id }}</div>
                  </div>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-address="props">
              <q-td key="address" :props="props">
                <div class="text-neutral-90 max-w-[20vw] text-wrap break-words">
                  {{ formatRibuan(props.row.pro_price) }}
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-action="props">
              <q-td key="action" :props="props">
                <action-table
                  :row="props.row"
                  @onEdit="(row:any) => onClick({ row,method:'edit' })"
                  @onDelete="(row:any) => onClick({ row,method:'delete' })"
                  @onShowDetail="(row:any) => onClick({ row,method:'detail' })"
                  show-detail
                />
              </q-td>
            </template>
            <template v-slot:header-cell-employee_info="props">
              <q-th key="employee_info" :props="props">
                <app-sort-table :label="props.col.label" column-sort="employee_info" @onSort="onSortTable" />
              </q-th>
            </template>

            <template v-slot:header-cell-address="props">
              <q-th key="address" :props="props">
                <app-sort-table :label="props.col.label" column-sort="name" @onSort="onSortTable" />
              </q-th>
            </template>
          </app-table>

          <pagination-table />
        </div>
      </div>

      <app-no-data title="No Data" subtitle="Click “+ Add New” to add new Employee" v-else-if="state == 'no-data'" />
    </app-container-card>

    <app-dialog
      v-model="showDialog"
      :title-header="dataDialog.title"
      :icon-header="dataDialog.icon"
      :label-submit="dataDialog.label"
      class="reset-width"
      @onSubmit="onSubmit"
    >
      <q-card-section class="content-crud p-6 w-[470px]">
        <div class="text-neutral-90 tx-body-2">
          Are you sure want to delete data employee “<span class="font-semibold">{{ editForm.emp_name }}</span
          >”?
        </div>
      </q-card-section>
    </app-dialog>
  </q-page>
</template>
