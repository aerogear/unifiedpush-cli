import {WebPushVariant} from '@aerogear/unifiedpush-admin-client';
import {UnifiedPushAdminClientMock} from '../../../mocks';
import {WebPushVariantHandler} from '../../../../src/cmds/variants-cmds/handlers/WebPushVariantHandler';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  UnifiedPushAdminClientMock.mockClear();
});

describe('WebPushVariantHandler', () => {
  it('Should have everything to create a WebPushVariant', async () => {
    const handler = new WebPushVariantHandler();
    const variant = (await handler.handle(
      {'auth-type': 'basic', url: 'http://localhost:9999', _: [''], $0: ''},
      {
        name: 'test',
        alias: 'mailto:test@redhat.com',
        type: 'web_push',
      } as WebPushVariant
    )) as WebPushVariant;
    expect(variant).toBeDefined();
    expect(variant.name).toEqual('test');
    expect(variant.alias).toEqual('mailto:test@redhat.com');
    expect(variant.type).toEqual('web_push');
    expect(variant.variantID).toEqual('TEST-ID');
    expect(variant.developer).toEqual('TEST-DEVELOPER');
    expect(variant.privateKey).toBeDefined();
    expect(variant.privateKey.length).toBeGreaterThan(1);
    expect(variant.publicKey).toBeDefined();
    expect(variant.publicKey.length).toBeGreaterThan(1);
  });
});
