/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {Arguments} from 'yargs';
import {ConsoleMock} from '../../mocks';
import {handler} from '../../../src/cmds/variants-cmds/list';
import {VariantFilter} from '@aerogear/unifiedpush-admin-client/dist/src/commands/variants/Variant';
import {
  createApplications,
  deleteApplication,
  getAllApplications,
  initMockEngine,
} from '../../mocks/UPSMock';

beforeEach(() => {
  initMockEngine();
  // Clear all instances and calls to constructor and all methods:
  ConsoleMock.init();
});

afterEach(() => {
  ConsoleMock.uninstall();
});

describe('variants list', () => {
  it('Should list all variants', async () => {
    createApplications({variantCount: 2, variantType: 'android'});
    const testApp = getAllApplications()[2];

    // @ts-ignore
    await handler({
      url: 'http://localhost:9999',
      appId: testApp.pushApplicationID,
      output: 'json',
      _: [''],
      $0: '',
    } as Arguments);
    expect(ConsoleMock.log).toHaveBeenCalled();
    expect(ConsoleMock.log).toHaveBeenCalledWith(
      JSON.stringify(testApp.variants)
    );
  });
  it('Should return empty result', async () => {
    createApplications({});
    const testApp = getAllApplications()[3];
    deleteApplication(testApp.pushApplicationID);

    const filter: VariantFilter = {name: 'wrongname'};
    // @ts-ignore
    await handler({
      url: 'http://localhost:9999',
      appId: testApp.pushApplicationID,
      filter: JSON.stringify(filter),
      output: 'json',
      _: [''],
      $0: '',
    } as Arguments);
    expect(ConsoleMock.log).toHaveBeenCalled();
    expect(ConsoleMock.log).toHaveBeenCalledWith(JSON.stringify([]));
  });
});
