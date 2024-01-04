import { describe, expect, it } from 'vitest';
import { useHomeDashboardState } from './home-dashboard-state';

describe('home-dashboard state', () => {
  it('base statistic', async () => {
    const { newUserCount, userGrowthRate } = useHomeDashboardState();
    expect(newUserCount.value).toBe(125670);
    expect(userGrowthRate.value).toBe(50.52);
  });
});
