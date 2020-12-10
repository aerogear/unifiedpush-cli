/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {Arguments} from 'yargs';
import {ConsoleMock} from '../../mocks';
import {handler} from '../../../src/cmds/app-cmds/delete';
import * as inquirer from 'inquirer';
import {
  createApplications,
  getAllApplications,
  initMockEngine,
} from '../../mocks/UPSMock';

jest.mock('inquirer', () => ({
  prompt: jest
    .fn()
    .mockReturnValueOnce({confirm: true})
    .mockReturnValue({confirm: false}),
}));

beforeEach(() => {
  ConsoleMock.init();
  initMockEngine();
  ConsoleMock.mockClear();
  const promptMock = (inquirer.prompt as unknown) as jest.Mock<
    typeof inquirer.prompt
  >;
  promptMock.mockClear();
});

afterEach(() => {
  ConsoleMock.uninstall();
});

describe('Delete Application', () => {
  it('Should delete all applications from UPS', async () => {
    createApplications({appCount: 3});
    // @ts-ignore
    await handler({
      url: 'http://localhost:9999',
      appId: [''],
      _: [''],
      $0: '',
    } as Arguments);
    expect(ConsoleMock.log).toHaveBeenCalled();
    expect(ConsoleMock.log).toHaveBeenCalledWith('3 application(s) deleted');
    expect(getAllApplications().length).toBe(0);
  });

  it('Should fail deletion', async () => {
    // @ts-ignore
    await handler({
      url: 'http://localhost:9999',
      appId: ['1234'],
      _: [''],
      $0: '',
    } as Arguments);
    expect(ConsoleMock.log).toHaveBeenCalled();
    expect(ConsoleMock.log).toHaveBeenCalledWith('0 applications deleted');
  });
});
