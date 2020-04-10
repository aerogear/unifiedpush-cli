import * as yargs from 'yargs';

import {
  mockClear,
  MockUnifiedPushAdminClient,
  createVariantsMock,
  findVariantsMock,
} from '../mocks/MockUnifiedPushAdminClient';
import { AndroidVariant } from '@aerogear/unifiedpush-admin-client';

process.env.upscli_test = 'true';

jest.mock('@aerogear/unifiedpush-admin-client', () => {
  return {
    UnifiedPushAdminClient: MockUnifiedPushAdminClient,
  };
});

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  mockClear();
});

const appId = 'd43c8d2b-64a8-41ee-abc8-1a15aa8dc4ec';

describe('variants list', () => {
  it('should call find with no filters', async () => {
    const parser = yargs.commandDir('../../src/cmds', { extensions: ['js', 'ts'] }).showHelpOnFail(false);

    const output = await new Promise(resolve => {
      parser.parse(
        `variants --url http://127.0.0.1:9999 --auth-type basic list ${appId}`,
        (err: Error, argv: {}, output: string) => {
          resolve(output);
        }
      );
    });

    expect(findVariantsMock).toHaveBeenCalledTimes(1);
    expect(findVariantsMock).toHaveBeenCalledWith(appId, undefined);
  });

  it('should call find with a filter', async () => {
    const filter = { name: 'variantName' };

    const parser = yargs.commandDir('../../src/cmds', { extensions: ['js', 'ts'] }).showHelpOnFail(false);

    const output = await new Promise(resolve => {
      parser.parse(
        `variants --url http://127.0.0.1:9999 --auth-type basic list ${appId} --filter ${JSON.stringify(filter)}`,
        (err: Error, argv: {}, output: string) => {
          resolve(output);
        }
      );
    });

    expect(findVariantsMock).toHaveBeenCalledTimes(1);
    expect(findVariantsMock).toHaveBeenCalledWith(appId, filter);
  });
});

const wait = async (millis: number) => {
  await new Promise(resolve => {
    setTimeout(() => resolve(), millis);
  });
};

describe('Variant Create', () => {
  it('should call create for android variant', async () => {
    const androidVariant = {
      name: 'variantName',
      type: 'android',
      projectNumber: '123456',
      googleKey: '123455',
    } as AndroidVariant;

    const parser = yargs.commandDir('../../src/cmds', { extensions: ['js', 'ts'] }).showHelpOnFail(true);

    const output = await new Promise(resolve => {
      parser.parse(
        `variants --url http://127.0.0.1:9999 --auth-type basic create --app-id ${appId} --def ${JSON.stringify(
          androidVariant
        )}`,
        (err: Error, argv: {}, output: string) => {
          resolve(output);
        }
      );
    });

    // Due to issue https://github.com/yargs/yargs/issues/1069 we have to add this

    await wait(1);

    expect(createVariantsMock).toHaveBeenCalledTimes(1);
    expect(createVariantsMock).toHaveBeenCalledWith(appId, androidVariant);
  });
});
