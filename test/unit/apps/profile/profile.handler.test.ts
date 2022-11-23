import { getProfile } from '../../../../src/apps/profile/index';

describe('Profile', () => {
  test('test profile', () => {
    expect(getProfile({}, {})).toBe('Get Profile!');
  });
});
