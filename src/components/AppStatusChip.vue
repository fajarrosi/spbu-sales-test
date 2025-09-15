<template>
  <app-chip v-bind="chipStatus(statusString)" padding="py-[2px] px-2">
    <div class="flex gap-x-2 items-center no-wrap">
      <div
        v-if="indicator"
        class="rounded-full h-2 w-2"
        :class="
          statusString == 'active' ? 'bg-semantic-green-80' : 'bg-neutral-40'
        "
      ></div>
      <div class="capitalize">
        {{ statusString }}
      </div>
    </div>
  </app-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  status: {
    type: Boolean,
    default: () => false,
  },
  indicator: {
    type: Boolean,
    default: () => true,
  },
});

const statusString = computed(() => {
  return props.status === true ? 'active' : 'deactive';
});

const bgstatusMap = {
  active: 'semantic-green-20',
  deactive: 'neutral-10',
};
const colorstatusMap = {
  active: 'semantic-green-80',
  deactive: 'neutral-70',
};

const chipStatus = (value: string): object => {
  return {
    bgColor: `${bgstatusMap[value as keyof typeof bgstatusMap]}` || '',
    color: `${colorstatusMap[value as keyof typeof colorstatusMap]}` || '',
  };
};
</script>
