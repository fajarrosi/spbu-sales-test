<script setup lang="ts">
import { onMounted, ref } from 'vue';
import shiftHandler from 'api/report/manageShift';
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
  { name: 'employee_info', align: 'left', label: 'Shift Info', field: 'id' },
  { name: 'action', align: 'left', label: 'Action', field: 'id' },
]);

setTitleNoData('Shift');

setHandler(shiftHandler);

const showDialogUpload = ref(false);

onMounted(() => {
  onInitData(shiftHandler.list('?page=1&limit=10'));
});

const onClick = ({ row, method = '' }: { row?: any; method: string }) => {
  switch (method) {
    case 'edit':
      router.push({ name: 'Store Shift', query: { id: row?.shift_id } });
      break;
    case 'add':
      router.push({ name: 'Store Shift' });
      break;
    case 'detail':
      router.push({ name: 'Detail Shift', params: { id: row?.shift_id } });
      break;
    default: //delete
      openDialog('delete');
      editForm.value = {
        shift_name: row?.shift_name,
        shift_id: row?.shift_id,
      };
      break;
  }
};
const resetForm = () => {
  onInitData(shiftHandler.list('?page=1&limit=10'));
  editForm.value = {
    shift_name: '',
    shift_id: '',
  };
};
const onSubmit = () => {
  onSubmitDialog(editForm.value.shift_id, editForm.value, resetForm);
};

const handleShowDialogUpload = () => {
  showDialogUpload.value = true;
};
</script>

<template>
  <q-page class="py-6 ml-6 mr-8">
    <app-container-card>
      <header-table
        title="Manage Shift"
        :chips="`${totalRecord} Shift`"
        labelAdd="Add Shift"
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
            :row-key="(row:any) => row.shift_id"
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
                      {{ props.row.shift_name }}
                    </div>
                    <div class="text-neutral-70">ID : {{ props.row.shift_id }}</div>
                  </div>
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

      <app-no-data title="No Data" subtitle="Click “+ Add New” to add new Shift" v-else-if="state == 'no-data'" />
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
          Are you sure want to delete data Shift “<span class="font-semibold">{{ editForm.shift_name }}</span
          >”?
        </div>
      </q-card-section>
    </app-dialog>
  </q-page>
</template>
