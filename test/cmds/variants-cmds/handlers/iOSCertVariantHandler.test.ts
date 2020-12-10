import {IOSVariant} from '@aerogear/unifiedpush-admin-client';
import {IOSCertVariantHandler} from '../../../../src/cmds/variants-cmds/handlers/iOSCertVariantHandler';
import {
  createApplications,
  getAllApplications,
  initMockEngine,
} from '../../../mocks/UPSMock';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  initMockEngine();
});

describe('IOSCertVariantHandler', () => {
  it('Should have everything to create a iOSVariant', async () => {
    createApplications({});
    const testApp = getAllApplications()[8];
    const handler = new IOSCertVariantHandler();
    const variant = (await handler.handle(
      {
        'auth-type': 'basic',
        url: 'http://localhost:9999',
        appId: testApp.pushApplicationID,
        _: [''],
        $0: '',
      },
      {
        name: 'test-ios',
        certificate: '/path/to/cert.p12',
        password: 'password',
        production: false,
        developer: 'TEST-DEVELOPER',
        type: 'ios',
      }
    )) as IOSVariant;
    expect(variant).toBeDefined();
    expect(variant.name).toEqual('test-ios');
    expect(variant.type).toEqual('ios');
    expect(variant.certificate).toEqual('/path/to/cert.p12');
    expect(variant.password).toEqual('password');
    expect(variant.developer).toEqual('TEST-DEVELOPER');
    expect(variant.production).toBe(false);
  });
});
