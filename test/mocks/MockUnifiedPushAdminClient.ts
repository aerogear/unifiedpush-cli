import {
  PushApplication,
  PushApplicationFilter,
  Variant,
} from '@aerogear/unifiedpush-admin-client';
import {mockData} from '../mockData';
import {applyPushApplicationFilter} from '@aerogear/unifiedpush-admin-client/dist/src/applications/PushApplication';
import {applyVariantFilter} from '@aerogear/unifiedpush-admin-client/dist/src/variants/Variant';

const findApplicationsMock = jest.fn(
  (filter?: PushApplicationFilter): PushApplication[] => {
    return applyPushApplicationFilter(mockData, filter);
  }
);

const createApplicationMock = jest.fn(
  (name: string): PushApplication => {
    return {
      id: 'new-app-id',
      pushApplicationID: 'new-app-push-id',
      name,
    } as PushApplication;
  }
);
const findVariantsMock = jest.fn(
  (appId: string, filter?: Record<string, string>): Variant[] =>
    applyVariantFilter(
      mockData.find(app => app.pushApplicationID === appId)!.variants!,
      filter
    ) || []
);
const createVariantsMock = jest.fn(
  (appId: string, def: Record<string, string>): Variant =>
    ({...def, variantID: 'TEST-ID', developer: 'TEST-DEVELOPER'} as Variant)
);

const deleteVariantsMock = jest.fn(
  (appId: string, filter: Record<string, string>): Variant[] => {
    return findVariantsMock(appId, filter);
  }
);

// tslint:disable-next-line:variable-name
export const AdminClientMock = {
  applications: {
    find: findApplicationsMock,
    create: createApplicationMock,
  },
  variants: {
    find: findVariantsMock,
    create: createVariantsMock,
    delete: deleteVariantsMock,
  },
};

function init() {
  return AdminClientMock;
}

function mockClear() {
  findApplicationsMock.mockClear();
  findVariantsMock.mockClear();
  createVariantsMock.mockClear();
  createApplicationMock.mockClear();
}

// tslint:disable-next-line:variable-name
export const UnifiedPushAdminClientMock = {
  init,
  mockClear,
};

jest.mock('@aerogear/unifiedpush-admin-client', () => {
  return {
    UnifiedPushAdminClient: UnifiedPushAdminClientMock.init,
  };
});
