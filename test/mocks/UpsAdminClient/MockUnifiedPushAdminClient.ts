import {
  createApplicationMock,
  findApplicationsMock,
  deleteApplicationMock,
  findVariantsMock,
  createVariantsMock,
  deleteVariantsMock,
} from './mocks';
import {
  PushApplication,
  PushApplicationFilter,
  Variant,
} from '@aerogear/unifiedpush-admin-client';
import {VariantFilter} from '@aerogear/unifiedpush-admin-client/dist/src/commands/variants/Variant';
import {SearchResult} from '@aerogear/unifiedpush-admin-client/dist/src/commands/applications/search/AbstractSearchCommand';
import {unwatchFile} from 'fs';
import {SearchApplicationsCommand} from '@aerogear/unifiedpush-admin-client/dist/src/commands/applications';

let pushAppArray: PushApplication[] = [];
let pushVariantArray: Variant[] = [];
function mockClear() {
  pushAppArray = [];
  pushVariantArray = [];
  findApplicationsMock.mockClear();
  findVariantsMock.mockClear();
  // createVariantsMock.mockClear();
  deleteApplicationMock.mockClear();
  deleteVariantsMock.mockClear();
}

// tslint:disable-next-line:variable-name
export const UnifiedPushAdminClientMock = {
  mockClear,
};

jest.mock('@aerogear/unifiedpush-admin-client', () => {
  return {
    UpsAdminClient: jest.fn().mockImplementation(() => {
      return {
        applications: {
          create: (name: string) => createApplicationMock(pushAppArray, name),
          delete: () => {
            const params: {filter?: PushApplicationFilter; page: number} = {
              filter: undefined,
              page: 1,
            };
            const res: {
              withFilter?: (filter: PushApplicationFilter) => void;
              page?: (page: number) => void;
              execute?: () => {};
            } = {
              withFilter: undefined,
              page: undefined,
            };
            res.withFilter = (filter: PushApplicationFilter) => {
              params.filter = filter;
              return res;
            };
            res.page = (pageNumber: number) => {
              params.page = pageNumber;
              return res;
            };
            res.execute = () =>
              deleteApplicationMock(pushAppArray, params.filter);
            return res;
          },
          search: (appId: PushApplication) => {
            const params: {filter?: PushApplicationFilter; page: number} = {
              filter: undefined,
              page: 1,
            };
            const res: {
              withFilter?: (filter: PushApplicationFilter) => void;
              page?: (page: number) => void;
              execute?: () => SearchResult;
            } = {
              withFilter: undefined,
              page: undefined,
            };
            res.withFilter = (filter: PushApplicationFilter) => {
              params.filter = filter;
              return res;
            };
            res.page = (pageNumber: number) => {
              params.page = pageNumber;
              return res;
            };
            res.execute = () =>
              findApplicationsMock(pushAppArray, params.filter, params.page);
            return res;
          },
          rename: (appId: PushApplication) => {},
        },
        variants: {
          create: (name: string) => createVariantsMock(pushVariantArray, name),

          search: () => {
            const params: {filter?: VariantFilter} = {
              filter: undefined,
            };
            return {
              withFilter: (filter: VariantFilter) => {
                params.filter = filter;
              },
              execute: () => findVariantsMock(pushVariantArray, params.filter),
            };
          },
        },
      };
    }),
  };
});
