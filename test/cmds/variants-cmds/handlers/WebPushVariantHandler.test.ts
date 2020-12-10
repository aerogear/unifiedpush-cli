import {WebPushVariant} from '@aerogear/unifiedpush-admin-client';
import {WebPushVariantHandler} from '../../../../src/cmds/variants-cmds/handlers/WebPushVariantHandler';
import {
  createApplications,
  getAllApplications,
  initMockEngine,
} from '../../../mocks/UPSMock';

beforeEach(() => {
  initMockEngine();
});

describe('WebPushVariantHandler', () => {
  it('Should have everything to create a WebPushVariant', async () => {
    createApplications({});
    const testApp = getAllApplications()[8];
    const handler = new WebPushVariantHandler();
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
        alias: 'mailto:test@redhat.com',
        developer: 'TEST-DEVELOPER',
        privateKey: 'ABSBSHDBDSBDS',
        publicKey: 'SJGSJFGKDSJGFKS',
        type: 'web_push',
      } as WebPushVariant
    )) as WebPushVariant;
    expect(variant).toBeDefined();
    expect(variant.name).toEqual('test');
    expect(variant.alias).toEqual('mailto:test@redhat.com');
    expect(variant.type).toEqual('web_push');
    expect(variant.developer).toEqual('TEST-DEVELOPER');
    expect(variant.privateKey).toBeDefined();
    expect(variant.privateKey.length).toBeGreaterThan(1);
    expect(variant.publicKey).toBeDefined();
    expect(variant.publicKey.length).toBeGreaterThan(1);
  });
});
