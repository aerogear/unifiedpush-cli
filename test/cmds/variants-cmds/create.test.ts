/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {
  UnifiedPushAdminClientMock,
  MockedVariantHandlerFactory,
  MockedVariantHandler,
  ConsoleMock,
} from '../../mocks';
import {handler} from '../../../src/cmds/variants-cmds/create';
import {AndroidVariant} from '@aerogear/unifiedpush-admin-client';

beforeAll(() => {
  MockedVariantHandlerFactory.initMock();
});

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  UnifiedPushAdminClientMock.mockClear();
  ConsoleMock.init();
  ConsoleMock.mockClear();
  MockedVariantHandlerFactory.clearMock();
});

afterEach(() => {
  ConsoleMock.uninstall();
});

describe('variants create', () => {
  it('Should create an android variants', async () => {
    const APP_ID = '2:2';
    const variantDef = {
      name: 'TEST-ANDROID',
      type: 'android',
      googleKey: 'TEST-GOOGLE-KEY',
      projectNumber: 'TEST-PROJECT-NUMBER',
    } as AndroidVariant;

    const argv = {
      url: 'http://localhost:9999',
      appId: APP_ID,
      def: JSON.stringify(variantDef),
    };

    // @ts-ignore
    await handler(argv);
    expect(MockedVariantHandler.handle).toHaveBeenCalledWith(argv, variantDef);
    expect(ConsoleMock.log).toHaveBeenCalledTimes(2);
    expect(ConsoleMock.log).toHaveBeenCalledWith('Variant created');
    expect(ConsoleMock.log).toHaveBeenCalledWith(
      `╔══════════════╤════════════╤═════════╗
║ NAME         │ VARIANT-ID │ TYPE    ║
╟──────────────┼────────────┼─────────╢
║ TEST-ANDROID │ VAR-ID     │ android ║
╚══════════════╧════════════╧═════════╝
`
    );
  });
});
