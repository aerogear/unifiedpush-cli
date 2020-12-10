import {AndroidVariant} from '@aerogear/unifiedpush-admin-client';
import {AndroidVariantHandler} from '../../../../src/cmds/variants-cmds/handlers/AndroidVariantHandler';
import {
  createApplications,
  getAllApplications,
  initMockEngine,
} from '../../../mocks/UPSMock';

beforeEach(() => {
  initMockEngine();
});

describe('AndroidVariantHandler', () => {
  it('Should have everything to create an AndroidVariant', async () => {
    createApplications({});
    const testApp = getAllApplications()[6];

    const handler = new AndroidVariantHandler();
    const variant = (await handler.handle(
      {
        'auth-type': 'basic',
        url: 'http://localhost:9999',
        appId: testApp.pushApplicationID,
        _: [''],
        $0: '',
      },
      {
        name: 'test',
        googleKey: 'TEST-GOOGLE-KEY',
        projectNumber: 'TEST-PRJ-NUMBER',
        developer: 'TEST-DEVELOPER',
        type: 'android',
      }
    )) as AndroidVariant;
    expect(variant).toBeDefined();
    expect(variant.name).toEqual('test');
    expect(variant.type).toEqual('android');
    //expect(variant.variantID).toEqual('TEST-ID');
    expect(variant.developer).toEqual('TEST-DEVELOPER');
    expect(variant.googleKey).toEqual('TEST-GOOGLE-KEY');
    expect(variant.projectNumber).toEqual('TEST-PRJ-NUMBER');
  });
});
