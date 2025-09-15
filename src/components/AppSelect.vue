<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted } from 'vue';
import { SetDataTable } from 'interface/SetDataTable';
import type { QSelect } from 'quasar';
import { scyllaApi } from 'boot/axios';
import { SuccessResponseTable } from 'src/interface/SuccessResponseTable';
import { SuccessDetailResponse } from 'src/interface/SuccessDetailResponse';

interface AppSelectProps {
  selected: number | string;
  columnName: string;
  columnCode?: string;
  columnId: string;
  url: string;
  selectAll?: boolean;
  exclude?: Array<unknown> | undefined;
}

const props = withDefaults(defineProps<AppSelectProps>(), {
  selected: 0,
  columnName: '',
  columnCode: '',
  columnId: '',
  url: '',
  selectAll: false,
});

const emits = defineEmits(['update:selected', 'getSelectedObject']);

const pageSize = 70;
const lastPage = ref(3);
const loading = ref(false);
const nextPage = ref(1);
const options = ref<Array<string>>([]);
const search = ref('');
const query = computed(() => {
  return `${props.url.includes('?') ? '&' : '?'}q=${search.value}&page=${nextPage.value}&limit=${pageSize}`;
});
const dataOption = ref<Array<{ [key: string]: string | number }>>([]);

interface anonymousObject {
  [Key: string | number]: string | number;
}

const getList = async (query?: string): Promise<SuccessResponseTable> => {
  return await scyllaApi.get(`${props.url}${query}`).then((res) => res.data);
};

const list = async (query?: string): Promise<SetDataTable> => {
  const { data, paging } = await getList(query);
  const { page_current: page, page_limit: limit, page_total, total_record } = paging;
  return { data, page, limit, page_total, total_record };
};

const getDetail = async (id?: number | string): Promise<SuccessDetailResponse> => {
  return await scyllaApi.get(`${props.url}${props.url.includes('?') ? '' : '/' + id}`).then((res) => res.data);
};

const qselect = ref('');

watch(
  () => props.selected,
  (val) => {
    if (val == 0 && !props.selectAll) {
      qselect.value = '';
    }
  }
);

function onSelected(val: string) {
  qselect.value = val;
  if (dataOption.value != null && val) {
    if (val != 'All') {
      let selectedObject: anonymousObject = {};
      if (props.columnCode) {
        const code = val.split(' - ').length > 2 ? val.split(' - ')[2].trim() : val.split(' - ')[1].trim();
        selectedObject = dataOption.value.find((el: anonymousObject) => el[props.columnCode] == code) ?? {};
      } else {
        selectedObject = dataOption.value.find((el: anonymousObject) => el[props.columnName] == val) ?? {};
      }
      if (Object.keys(selectedObject).length > 0) {
        emits('update:selected', selectedObject[props.columnId]);
        emits('getSelectedObject', selectedObject);
      }
    } else {
      emits('update:selected', 0);
    }
  }
}

const onExcludeOptions = (data: SetDataTable) => {
  if (props.exclude) {
    return data.data.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item1: any) => !props.exclude?.includes(item1[props.columnId])
    );
  } else {
    return data.data;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const optionWording = (data: any) => {
  if (props.columnCode) {
    return `${data[props.columnName]} - ${data[props.columnCode]}`;
  }
  return data[props.columnName];
};

//NOTE - variable if when mounted theres is data selected (edit data)
const dataSelected = ref<anonymousObject>({});
onMounted(async () => {
  if (props.selected != 0) {
    const { data } = await getDetail(props.selected);

    if (props.url.includes('?') && Array.isArray(data)) {
      const dataFind = data.find((el: any) => el[props.columnId] === props.selected);
      qselect.value = optionWording(dataFind);
      dataSelected.value = dataFind;
      emits('getSelectedObject', data);
    } else {
      qselect.value = optionWording(data);
      dataSelected.value = data;
      emits('getSelectedObject', data);
    }
  }
  if (props.selectAll) {
    qselect.value = 'All';
  }
});

//NOTE - set data when search.value unavailable
const setData = async (dataFromApi: SetDataTable) => {
  nextPage.value = dataFromApi.page;
  lastPage.value = dataFromApi.page_total;

  dataFromApi.data = onExcludeOptions(dataFromApi);

  options.value = dataFromApi.data?.map((el) => optionWording(el)) || [];

  dataOption.value = dataFromApi.data || [];
  //NOTE - Check if the selected data is unavailable in data page 1 then push data to options.value
  if (
    Object.keys(dataSelected.value).length > 0 &&
    !dataOption.value?.some((el) => el[props.columnId] === dataSelected.value[props.columnId])
  ) {
    options.value.push(optionWording(dataSelected));
    dataOption.value.push(dataSelected.value);
  }

  if (props.selectAll) {
    options.value.unshift('All');
  }
};

//NOTE - if search.value is available then options value based on data option from call api
const setDataSearchData = (data: SetDataTable) => {
  nextPage.value = data.page;
  lastPage.value = data.page_total;
  data.data = onExcludeOptions(data);

  options.value = data.data?.map((el) => optionWording(el)) || [];

  //NOTE - diperlukan ketika search & hasil datanya belum ada di dataOption
  data.data?.forEach((el) => {
    if (!dataOption.value?.some((opt) => opt[props.columnCode] === el[props.columnCode])) {
      dataOption.value.push(el);
    }
  });
};

//NOTE - set data when on scroll add data to option & dataOption if there's no data duplicate
const setDataonScroll = (data: SetDataTable) => {
  nextPage.value = data.page;
  lastPage.value = data.page_total;

  data.data = onExcludeOptions(data);

  data.data?.forEach((el) => {
    if (!dataOption.value.some((opt) => opt[props.columnCode] === el[props.columnCode])) {
      dataOption.value.push(el);
      options.value.push(optionWording(el));
    }
  });
};

interface details {
  /**
   * Index of the list item that was scrolled into view (0 based)
   */
  index: number;
  /**
   * The index of the first list item that is rendered (0 based)
   */
  from: number;
  /**
   * The index of the last list item that is rendered (0 based)
   */
  to: number;
  /**
   * Direction of change
   */
  direction: 'increase' | 'decrease';
  /**
   * Vue reference to the QSelect
   */
  ref: QSelect;
}

async function onScroll(details: details) {
  let data: SetDataTable;
  const lastIndex = options.value.length - 1;
  if (loading.value !== true && nextPage.value < lastPage.value && details.to === lastIndex) {
    loading.value = true;
    nextPage.value++;
    try {
      data = await list(query.value);
      if (data) {
        await setDataonScroll(data);
        nextTick(() => {
          details.ref.refresh();
        });
      }
    } catch (error) {
      console.error('error', error);
    } finally {
      loading.value = false;
    }
  }
}

async function onFilter(val: any, update: any) {
  let data: SetDataTable;
  loading.value = true;
  nextPage.value = 1;
  search.value = val === '' ? '' : val.toLowerCase();
  try {
    data = await list(query.value);
    if (data) {
      update(() => {
        if (val === '') {
          setData(data);
        } else {
          setDataSearchData(data);
        }
      });
    }
    return;
  } catch (error) {
    console.error('error', error);
  } finally {
    loading.value = false;
  }
}

const onClear = () => {
  emits('update:selected', 0);
  if (props.selectAll) {
    qselect.value = 'All';
  }
  emits('getSelectedObject', {});
};
</script>

<template>
  <q-select
    outlined
    dense
    class="search-input"
    dropdown-icon="expand_more"
    popup-content-class="submenu-status"
    transition-show="scale"
    transition-hide="scale"
    :modelValue="qselect"
    @update:modelValue="(event:any) => onSelected(event)"
    :options="options"
    v-bind="$attrs"
    :clearable="qselect == 'All' ? false : true"
    use-input
    hide-selected
    fill-input
    input-debounce="1000"
    lazy-rules
    hide-bottom-space
    :loading="loading"
    @filter="onFilter"
    @virtual-scroll="onScroll"
    @clear="onClear"
  >
    <template v-slot:option="scope">
      <q-item tag="label" v-ripple v-bind="scope.itemProps">
        <q-item-section avatar class="p-0">
          <q-radio :modelValue="qselect" :val="scope.opt" color="primary-red-80" />
        </q-item-section>
        <q-item-section class="p-0">
          <q-item-label style="margin-left: -12px; color: #353535" class="tx-body-3">{{ scope.opt }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-italic text-grey"> No options parameter </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
