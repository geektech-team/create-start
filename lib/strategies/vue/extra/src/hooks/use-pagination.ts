import { ref, computed } from 'vue';

export const usePagination = (defaultPageSize: number = 10) => {
  const total = ref(0);
  const current = ref(1);
  const pageSize = ref(defaultPageSize);
  const offset = computed(() => {
    return (current.value - 1) * pageSize.value;
  });
  return { total, current, pageSize, offset };
};
