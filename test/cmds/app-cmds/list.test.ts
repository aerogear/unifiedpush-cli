/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {ConsoleMock} from '../../mocks';
import {handler} from '../../../src/cmds/app-cmds/list';
import {
  createApplications,
  getAllApplications,
  initMockEngine,
} from '../../mocks/UPSMock';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  // UnifiedPushAdminClientMock.mockClear();
  initMockEngine();
  ConsoleMock.init();
});

afterEach(() => {
  ConsoleMock.uninstall();
});

describe('applications', () => {
  it('Should list all applications', async () => {
    // create 5 applications
    createApplications({appCount: 5, variantCount: 3});

    const apps = getAllApplications();

    // @ts-ignore
    await handler({url: 'http://localhost:9999', output: 'json'});

    const res = JSON.parse(ConsoleMock.log.mock.calls[0][0]);
    expect(ConsoleMock.log).toHaveBeenCalledTimes(1);
    expect(res).toMatchObject(apps);
    expect(res.length).toEqual(apps.length);
  });

  it('Should return "no applications found"', async () => {
    const filter = {name: 'wrong name'};
    // @ts-ignore
    await handler({
      url: 'http://localhost:9999',
      output: 'json',
      filter: JSON.stringify(filter),
    });
    expect(ConsoleMock.log).toHaveBeenCalledTimes(1);
    expect(ConsoleMock.log).toHaveBeenCalledWith(JSON.stringify([]));
  });
});
