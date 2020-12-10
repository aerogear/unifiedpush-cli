/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {Arguments} from 'yargs';
import {ConsoleMock} from '../../mocks';
import {handler} from '../../../src/cmds/variants-cmds/delete';
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
  initMockEngine();
  ConsoleMock.init();
  // Clear all instances and calls to constructor and all methods:
  ConsoleMock.mockClear();
  const promptMock = (inquirer.prompt as unknown) as jest.Mock<
    typeof inquirer.prompt
  >;
  promptMock.mockClear();
});

afterEach(() => {
  ConsoleMock.uninstall();
});

describe('variants delete', () => {
  it('Should delete all variants', async () => {
    createApplications({});

    const testApp = getAllApplications()[3];
    const variantCount = testApp.variants?.length || 0;

    // @ts-ignore
    await handler({
      url: 'http://localhost:9999',
      appId: testApp.pushApplicationID,
      _: [''],
      $0: '',
    } as Arguments);
    expect(ConsoleMock.log).toHaveBeenCalled();
    expect(ConsoleMock.log).toHaveBeenCalledWith(
      `${variantCount} variant(s) deleted`
    );
  });

  it('Should cancel deletion', async () => {
    createApplications({});
    const testApp = getAllApplications()[3];
    // @ts-ignore
    await handler({
      url: 'http://localhost:9999',
      appId: testApp.pushApplicationID,
      _: [''],
      $0: '',
    } as Arguments);
    expect(ConsoleMock.log).not.toHaveBeenCalled();
  });
});
