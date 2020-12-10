/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {ConsoleMock} from '../../mocks';
import {handler} from '../../../src/cmds/variants-cmds/create';
import {AndroidVariant} from '@aerogear/unifiedpush-admin-client';
import {
  createApplication,
  getAllApplications,
  initMockEngine,
} from '../../mocks/UPSMock';
import {IDGenerator} from '../../mocks/DataStore';

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
      def: JSON.stringify(variantDef),
    };

    const variantID = IDGenerator.peek();

    // @ts-ignore
    await handler(argv);
    expect(ConsoleMock.log).toHaveBeenCalledTimes(2);
    expect(ConsoleMock.log).toHaveBeenCalledWith('Variant created');
    expect(ConsoleMock.log).toHaveBeenCalledWith(
      `╔══════════════╤══════════════════════════════════════╤═════════╗
║ NAME         │ VARIANT-ID                           │ TYPE    ║
╟──────────────┼──────────────────────────────────────┼─────────╢
║ TEST-ANDROID │ ${variantID} │ android ║
╚══════════════╧══════════════════════════════════════╧═════════╝
`
    );
  });
});
