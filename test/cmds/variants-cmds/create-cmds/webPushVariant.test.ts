/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {ConsoleMock} from '../../../mocks';
import {
  createApplication,
  getAllApplications,
  initMockEngine,
} from '../../../mocks/UPSMock';
import {IDGenerator} from '../../../mocks/DataStore';
import {WebPushVariantDefinition} from '@aerogear/unifiedpush-admin-client';
import {handler} from '../../../../src/cmds/variants-cmds/create-cmds/webpushVariant';

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

describe('webpush variants create', () => {
  it('Should create an web_push variants', async () => {
    const app = getAllApplications()[3];
    const variantDef = {
      name: 'TEST-WEBPUSH',
      type: 'web_push',
      publicKey: 'public key',
      privateKey: 'private key',
      alias: 'mailto:test@aerogear.com',
    } as WebPushVariantDefinition;

    const argv = {
      url: 'http://localhost:9999',
      appId: app.pushApplicationID,
      output: 'json',
      ...variantDef,
    };

    const variantID = IDGenerator.peek();
    // @ts-ignore
    await handler(argv);

    const newVariant = app.variants?.find(v => v.variantID === variantID)!;
    expect(ConsoleMock.log).toHaveBeenCalledTimes(1);
    expect(JSON.parse(ConsoleMock.log.mock.calls[0][0])).toEqual([newVariant]);
    expect(newVariant.type).toEqual('web_push');
  });
});
