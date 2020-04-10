import {normalizeFilter} from '../../src/utils/FilterUtils';

describe('FilterUtils', () => {
  it('Should normalize all filters', () => {
    const filterToNormalize = {
      NaME: 'appName',
      'variant-id': 'var id',
      TYPE: 'android',
      'push-application-id': 'pushappid',
      developer: 'test',
    };
    const normalizedFilter = {
      name: 'appName',
      variantID: 'var id',
      type: 'android',
      pushApplicationID: 'pushappid',
      developer: 'test',
    };

    expect(normalizeFilter(filterToNormalize)).toEqual(normalizedFilter);
  });
});
