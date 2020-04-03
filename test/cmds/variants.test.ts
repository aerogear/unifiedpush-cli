import * as yargs from 'yargs';

import { mockClear, MockUnifiedPushAdminClient } from '../mocks/MockUnifiedPushAdminClient';
import { createVariantsMock, findVariantsMock } from '../mocks/MockUnifiedPushAdminClient';
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

describe('variants list', () => {
  const appId = 'd43c8d2b-64a8-41ee-abc8-1a15aa8dc4ec';

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
    expect(findVariantsMock.mock.calls[0][0]).toEqual(appId);
    expect(findVariantsMock.mock.calls[0][1]).toBeUndefined();
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
    expect(findVariantsMock.mock.calls[0][0]).toEqual(appId);
    expect(findVariantsMock.mock.calls[0][1]).toEqual(filter);
  });
});
