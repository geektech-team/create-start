import { ref } from 'vue';

export const useHomeDashboardState = () => {
  const newUserCount = ref(125670);
  const userGrowthRate = ref(50.52);
  return { newUserCount, userGrowthRate };
};
