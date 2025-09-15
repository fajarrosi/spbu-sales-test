/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { SetDataTable } from 'interface/SetDataTable';
import { success } from 'interface/SuccessResponse';
import { useGeneralFetch } from 'methods/useGeneralFetch';
import { getImage } from 'methods/general';

export const useTable = defineStore('table', () => {
  const rows = ref<any[]>([]);
  const loading = ref(false);
  const loadingInit = ref(false);
  const totalPage = ref(1);
  const totalRecord = ref(1);
  const state = ref('table-data');
  interface Field {
    (row: object): any;
  }
  interface Column {
    name: string;
    align: string;
    label: string;
    field: string | Field;
  }
  const columns = ref<Column[]>();
  const setColumn = (column: Column[]) => {
    columns.value = column;
  };

  const page = ref<number>(1);

  const limit = ref<number>(10);

  const search = ref<string | number | null>();
  const loadsearch = ref(false);

  const updateSearch = (value: string | number | null) => {
    loadsearch.value = true;
    search.value = value;
    setTimeout(() => {
      loadsearch.value = false;
    }, 300);
  };

  const onDeleteSearching = (): void => {
    search.value = null;
  };

  const onSortTable = (sort: object) => {
    console.log('sort', sort);
  };

  interface handler {
    list?: (query?: string | undefined) => Promise<SetDataTable>;
    create?: (data: any) => Promise<success>;
    update?: (id: number, data: object) => Promise<success>;
    destroy?: (id: number) => Promise<success>;
  }

  const handlerData = ref<handler>();

  const setHandler = (handler: handler) => {
    handlerData.value = handler;
  };

  const onInitData = (callback: Promise<SetDataTable>) => {
    loadingInit.value = true;
    callback.then((res) => {
      loadingInit.value = false;
      state.value = res.data == null ? 'no-data' : 'table-data';
      rows.value = res.data == null ? [] : res.data;
      limit.value = res.limit;
      page.value = res.page;
      totalPage.value = res.page_total;
      totalRecord.value = res.total_record;
    });
  };

  const onList = (callback: Promise<SetDataTable>) => {
    loading.value = true;
    callback.then((res) => {
      loading.value = false;
      rows.value = res.data == null ? [] : res.data;
      state.value = res.data == null ? 'no-data' : 'table-data';
      limit.value = res.limit;
      page.value = res.page;
      totalPage.value = res.page_total;
      totalRecord.value = res.total_record;
    });
  };

  const onFilter = (callback: Promise<SetDataTable>) => {
    loading.value = true;
    callback.then((res) => {
      loading.value = false;
      rows.value = res.data == null ? [] : res.data;
      state.value = 'table-data';
      limit.value = res.limit;
      page.value = res.page;
      totalPage.value = res.page_total;
      totalRecord.value = res.total_record;
    });
  };

  interface Query {
    page?: number;
    limit?: number;
    status?: number;
    search?: string | null;
  }

  const getQuery = (queries: Query) => {
    const { page = 1, limit = 10, status = 0, search = '' } = queries;
    const query = `?q=${search}&page=${page}&limit=${limit}${status != 0 ? `&is_active=${status}` : ''}`;
    if (handlerData.value && handlerData.value.list !== undefined) {
      onList(handlerData.value.list(query));
    }
  };

  const noData = ref({
    title: '',
    subtitle: '',
  });

  const titlePage = ref('');

  const setTitleNoData = (title: string) => {
    noData.value.title = 'No Data';
    titlePage.value = title;
  };
  const setSubtitleNoData = (subtitle: string) => {
    noData.value.subtitle = subtitle ? subtitle : `Click “Add to List” to add new ${noData.value.title}`;
  };

  const addForm = ref();

  const onSubmitAdd = (payload: object, callback: VoidCallback) => {
    if (handlerData.value && handlerData.value.create !== undefined) {
      useGeneralFetch(handlerData.value.create(payload), callback, 'New data successfully added');
    }
  };

  const showDialog = ref(false);
  const showComponent = ref();
  const dataDialog = ref({
    method: '',
    title: '',
    icon: '',
    label: '',
  });

  const editForm = ref();

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const openDialog = (method: string, title = '') => {
    showDialog.value = false;
    setTimeout(() => {
      showDialog.value = true;
    }, 100);
    let icon = '';
    let label = '';
    switch (method) {
      case 'edit':
        icon = 'table/PencilSimpleSolid';
        label = 'Save';
        break;
      case 'add':
        icon = 'table/PlusCircle';
        label = 'Save';
        break;
      default: // delete
        icon = 'table/TrashSimpleSolid';
        label = 'Delete';
        break;
    }

    dataDialog.value = {
      method,
      title: `${capitalize(method)} ${title ?? 'Data'}`,
      icon: getImage(`${icon}.svg`),
      label,
    };
  };

  const onSubmitDialog = (id: number, payload: object, callback: VoidCallback, message = 'data') => {
    showDialog.value = false;
    if (
      handlerData.value &&
      handlerData.value.update !== undefined &&
      handlerData.value.destroy !== undefined &&
      handlerData.value.create !== undefined
    ) {
      if (dataDialog.value.method == 'add') {
        useGeneralFetch(handlerData.value.create(payload), callback, `${message} successfully created`);
      } else if (dataDialog.value.method == 'edit') {
        useGeneralFetch(handlerData.value.update(id, payload), callback, `${message} successfully updated`);
      } else {
        useGeneralFetch(handlerData.value.destroy(id), callback, `${message} successfully deleted`);
      }
    }
  };

  const resultError = (dataError: string[]) => {
    let hasil = '<span>';
    for (let index = 0; index < dataError.length; index++) {
      hasil += dataError[index] + '</span>' + '<br>';
    }
    return hasil;
  };

  function paginateDummy<
  T extends Record<string, any>,
  KName extends keyof T,
  KId extends keyof T
>(
  data: T[],
  query: string,
  nameKey: KName,
  idKey: KId
) {
  // Parse query string
  const params = new URLSearchParams(query);

  const page = Number(params.get("page")) || 1;
  const limit = Number(params.get("limit")) || 10;

  const q = params.get("q")?.toLowerCase() || "";

  const sorted = [...data].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  const filtered = q
    ? sorted.filter(
        (v) =>
          String(v[nameKey]).toLowerCase().includes(q) ||
          String(v[idKey]).toLowerCase().includes(q)
      )
    : sorted;

  const totalRecord = filtered.length;
  const pageTotal = Math.max(Math.ceil(totalRecord / limit), 1);

  const currentPage = Math.min(page, pageTotal);

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  const records = filtered.slice(startIndex, endIndex);

  return {
    page: currentPage,
    limit,
    page_total: pageTotal,
    total_record: totalRecord,
    data: records,
  };
}


  return {
    rows,
    loading,
    totalPage,
    page,
    limit,
    totalRecord,
    state,
    loadingInit,
    search,
    loadsearch,
    updateSearch,
    onDeleteSearching,
    getQuery,

    columns,
    setColumn,

    onSortTable,
    onList,
    onInitData,

    noData,
    setTitleNoData,
    setSubtitleNoData,

    handlerData,
    setHandler,

    addForm,
    onSubmitAdd,

    showDialog,
    dataDialog,
    showComponent,
    editForm,
    openDialog,
    onSubmitDialog,

    titlePage,

    resultError,
    onFilter,
    paginateDummy
  };
});
