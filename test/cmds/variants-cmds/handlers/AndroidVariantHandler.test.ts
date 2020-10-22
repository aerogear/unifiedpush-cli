import {AndroidVariant} from '@aerogear/unifiedpush-admin-client';
import {UnifiedPushAdminClientMock} from '../../../mocks';
import {AndroidVariantHandler} from '../../../../src/cmds/variants-cmds/handlers/AndroidVariantHandler';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  UnifiedPushAdminClientMock.mockClear();
});

describe('AndroidVariantHandler', () => {
  it('Should have everything to create an AndroidVariant', async () => {
    const handler = new AndroidVariantHandler();
    const variant = (await handler.handle(
      {'auth-type': 'basic', url: 'http://localhost:9999', _: [''], $0: ''},
      {
        name: 'test',
        googleKey: 'TEST-GOOGLE-KEY',
        projectNumber: 'TEST-PRJ-NUMBER',
        type: 'android',
      }
    )) as AndroidVariant;
    expect(variant).toBeDefined();
    expect(variant.name).toEqual('test');
    expect(variant.type).toEqual('android');
    expect(variant.variantID).toEqual('TEST-ID');
    expect(variant.developer).toEqual('TEST-DEVELOPER');
    expect(variant).toEqual('TEST-GOOGLE-KEY');
    expect(variant.projectNumber).toEqual('TEST-PRJ-NUMBER');
  });
});
