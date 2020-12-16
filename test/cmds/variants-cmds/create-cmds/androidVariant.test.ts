/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {ConsoleMock} from '../../../mocks';
import {
  createApplication,
  getAllApplications,
  initMockEngine,
} from '../../../mocks/UPSMock';
import {IDGenerator} from '../../../mocks/DataStore';
import {AndroidVariant} from '@aerogear/unifiedpush-admin-client';
import {handler} from '../../../../src/cmds/variants-cmds/create-cmds/andoridVariant';

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
  it('Should create an android variants', async () => {
    const app = getAllApplications()[3];
    const variantDef = {
      name: 'TEST-ANDROID',
      type: 'android',
      googleKey: 'TEST-GOOGLE-KEY',
      projectNumber: 'TEST-PROJECT-NUMBER',
    } as AndroidVariant;

    const argv = {
      url: 'http://localhost:9999',
      appId: app.pushApplicationID,
      output: 'json',
      ...variantDef,
    };

    const variantID = IDGenerator.peek();

    // @ts-ignore
    await handler(argv);
    expect(ConsoleMock.log).toHaveBeenCalledTimes(1);
    expect(JSON.parse(ConsoleMock.log.mock.calls[0][0])).toEqual([
      app.variants?.find(v => v.variantID === variantID),
    ]);
  });
});
