/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {Arguments} from 'yargs';
import {UnifiedPushAdminClientMock, ConsoleMock} from '../../mocks';
import {handler} from '../../../src/cmds/variants-cmds/list';
import {VariantFilter} from '@aerogear/unifiedpush-admin-client/dist/src/commands/variants/Variant';
import {UPSAdminClientFactory} from '../../../src/utils/UPSAdminClientFactory';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  UnifiedPushAdminClientMock.mockClear();
  ConsoleMock.init();
});

afterEach(() => {
  ConsoleMock.uninstall();
});

describe('variants list', () => {
  it('Should list all variants', async () => {
    const app = await UPSAdminClientFactory.getUpsAdminInstance({_: [], $0: ''})
      .applications.create('application 1')
      .execute();

    // await UPSAdminClientFactory.getUpsAdminInstance({_: [], $0: ''})
    //     .variants.android.create()
    const expectedResult = `╔═══════════╤════════════╤══════════╗
║ NAME      │ VARIANT-ID │ TYPE     ║
╟───────────┼────────────┼──────────╢
║ Variant 1 │ v-2:1      │ android  ║
╟───────────┼────────────┼──────────╢
║ Variant 2 │ v-2:2      │ web_push ║
╚═══════════╧════════════╧══════════╝
`;
    // @ts-ignore
    await handler({
      url: 'http://localhost:9999',
      appId: app.pushApplicationID,
      _: [''],
      $0: '',
    } as Arguments);
    expect(ConsoleMock.log).toHaveBeenCalled();
    expect(ConsoleMock.log).toHaveBeenCalledWith(expectedResult);
  });
  it('Should return "no variants found"', async () => {
    const filter: VariantFilter = {name: 'wrongname'};
    // @ts-ignore
    await handler({
      url: 'http://localhost:9999',
      appId: '2:2',
      filter: JSON.stringify(filter),
      _: [''],
      $0: '',
    } as Arguments);
    expect(ConsoleMock.log).toHaveBeenCalled();
    expect(ConsoleMock.log).toHaveBeenCalledWith('No variants found');
  });
});
