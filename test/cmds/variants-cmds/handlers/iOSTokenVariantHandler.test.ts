import {IOSTokenVariant} from '@aerogear/unifiedpush-admin-client';
import {UnifiedPushAdminClientMock} from '../../../mocks';
import {IOSTokenVariantHandler} from '../../../../src/cmds/variants-cmds/handlers/iOSTokenVariantHandler';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  UnifiedPushAdminClientMock.mockClear();
});

describe('IOSTokenVaraintHandler', () => {
  it('Should have everything to create a iOSTokenVariant', async () => {
    const handler = new IOSTokenVariantHandler();
    const variant = (await handler.handle(
      {'auth-type': 'basic', url: 'http://localhost:9999', _: [''], $0: ''},
      {
        name: 'test-ios-token',
        teamId: 'MyTeamID',
        keyId: 'MyKeyID',
        bundleId: 'org.aerogear',
        type: 'ios_token',
        privateKey: '/path/to/key',
        production: false,
      }
    )) as IOSTokenVariant;
    expect(variant).toBeDefined();
    expect(variant.name).toEqual('test-ios-token');
    expect(variant.type).toEqual('ios_token');
    expect(variant.teamId).toEqual('MyTeamID');
    expect(variant.keyId).toEqual('MyKeyID');
    expect(variant.bundleId).toEqual('org.aerogear');
    expect(variant.developer).toEqual('TEST-DEVELOPER');
  });
});
