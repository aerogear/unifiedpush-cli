import {ConsoleMock} from '../../../mocks';
import {
  createApplication,
  getAllApplications,
  initMockEngine,
} from '../../../mocks/UPSMock';
import {IDGenerator} from '../../../mocks/DataStore';
import {
  IOSTokenVariant,
  IOSTokenVariantDefinition,
} from '@aerogear/unifiedpush-admin-client';
import {handler} from '../../../../src/cmds/variants-cmds/create-cmds/iosToken';
import {Arguments} from 'yargs';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  initMockEngine();
  createApplications(10);
  ConsoleMock.init();
  ConsoleMock.mockClear();
});

afterEach(() => {
  ConsoleMock.uninstall();
});

const createApplications = (howmany: number) => {
  for (let i = 0; i < howmany; i++) {
    createApplication(`TEST APP-${i}`);
  }
};

describe('variants create', () => {
  it('Should create an ios-token variants', async () => {
    const app = getAllApplications()[3];
    const variantDef = {
      name: 'TEST-IOS',
      type: 'ios_token',
      production: false,
      teamId: 'team',
      keyId: 'test-key',
      bundleId: 'bundle-id',
      privateKey: 'test/resources/mock-pkey.pem',
    } as IOSTokenVariantDefinition;

    const argv = {
      url: 'http://localhost:9999',
      appId: app.pushApplicationID,
      output: 'json',
      ...variantDef,
    };

    const variantID = IDGenerator.peek();
    await handler((argv as unknown) as Arguments<IOSTokenVariant>);

    const newVariant = app.variants!.find(v => v.variantID === variantID)!;
    expect(ConsoleMock.log).toHaveBeenCalledTimes(1);
    expect(JSON.parse(ConsoleMock.log.mock.calls[0][0])).toEqual([newVariant]);
    expect(newVariant.type).toEqual('ios_token');
  });
});
