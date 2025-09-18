<script setup lang="ts">
import { onMounted, ref } from 'vue';
import stockHandler from 'api/inventory/stock';
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
  { name: 'employee_info', align: 'left', label: 'Stock Info', field: 'id' },
  { name: 'stock', align: 'left', label: 'Stock Total', field: 'id' },
  { name: 'action', align: 'left', label: 'Action', field: 'id' },
]);

setTitleNoData('Stock');

setHandler(stockHandler);

const showDialogUpload = ref(false);

onMounted(() => {
  onInitData(stockHandler.list('?page=1&limit=10'));
});

const onClick = ({ row, method = '' }: { row?: any; method: string }) => {
  switch (method) {
    case 'edit':
      router.push({ name: 'Store Stock', query: { id: row?.stock_id } });
      break;
    case 'add':
      router.push({ name: 'Store Stock' });
      break;
    case 'detail':
      router.push({ name: 'Detail Stock', params: { id: row?.stock_id } });
      break;
    default: //delete
      openDialog('delete');
      editForm.value = {
        pro_name: row?.pro_name,
        stock_id: row?.stock_id,
      };
      break;
  }
};
const resetForm = () => {
  onInitData(stockHandler.list('?page=1&limit=10'));
  editForm.value = {
    pro_name: '',
    stock_id: '',
  };
};
const onSubmit = () => {
  onSubmitDialog(editForm.value.stock_id, editForm.value, resetForm);
};

const handleShowDialogUpload = () => {
  showDialogUpload.value = true;
};
</script>

<template>
  <q-page class="py-6 ml-6 mr-8">
    <app-container-card>
      <header-table
        title="Manage Stock"
        :chips="`${totalRecord} Stock`"
        labelAdd="Add Stock"
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
            :row-key="(row:any) => row.stock_id"
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
            <template v-slot:body-cell-stock="props">
              <q-td key="stock" :props="props">
                <div class="text-neutral-90 max-w-[20vw] text-wrap break-words">
                  {{ formatRibuan(props.row.stock) }}
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
          </app-table>

          <pagination-table />
        </div>
      </div>

      <app-no-data title="No Data" subtitle="Click “+ Add New” to add new Stock" v-else-if="state == 'no-data'" />
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
          Are you sure want to delete data Stock “<span class="font-semibold">{{ editForm.pro_name }}</span
          >”?
        </div>
      </q-card-section>
    </app-dialog>
  </q-page>
</template>
