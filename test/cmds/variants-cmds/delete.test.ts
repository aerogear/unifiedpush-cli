/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {Arguments} from 'yargs';
import {UnifiedPushAdminClientMock, ConsoleMock} from '../../mocks';
import {UPSAdminClientFactory} from '../../../src/utils/UPSAdminClientFactory';
import {handler} from '../../../src/cmds/variants-cmds/delete';
import * as inquirer from 'inquirer';

jest.mock('inquirer', () => ({
  prompt: jest
    .fn()
    .mockReturnValueOnce({confirm: true})
    .mockReturnValue({confirm: false}),
}));

beforeEach(() => {
  ConsoleMock.init();
  // Clear all instances and calls to constructor and all methods:
  UnifiedPushAdminClientMock.mockClear();
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
    // @ts-ignore
    await UPSAdminClientFactory.getUpsAdminInstance({
      _: [],
      $0: '',
    })
      .applications.delete()
      .execute();
    expect(ConsoleMock.log).toHaveBeenCalled();
    expect(ConsoleMock.log).toHaveBeenCalledWith('2 variant(s) deleted');
  });

  // describe('variants delete', () => {
  //   it('Should delete all variants', async () => {
  //     // @ts-ignore
  //     await handler({
  //       url: 'http://localhost:9999',
  //       appId: '2:2',
  //       _: [''],
  //       $0: '',
  //     } as Arguments);
  //     expect(ConsoleMock.log).toHaveBeenCalled();
  //     expect(ConsoleMock.log).toHaveBeenCalledWith('2 variant(s) deleted');
  //   });

  it('Should cancel deletion', async () => {
    // @ts-ignore
    await handler({
      url: 'http://localhost:9999',
      appId: '2:2',
      _: [''],
      $0: '',
    } as Arguments);
    expect(ConsoleMock.log).not.toHaveBeenCalled();
  });
});
