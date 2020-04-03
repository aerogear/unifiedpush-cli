import { PushApplication, PushApplicationFilter, Variant } from '@aerogear/unifiedpush-admin-client';
import { mockData } from '../mockData';

export const findApplicationsMock = jest.fn((filter?: PushApplicationFilter): PushApplication[] => {
  return mockData;
});

export const createApplicationMock = jest.fn(
  (name: string): PushApplication => {
    return mockData[0];
  }
);
export const findVariantsMock = jest.fn((appId: string, name: string): Variant[] => []);
export const createVariantsMock = jest.fn((appId: string, def: string): Variant => ({} as Variant));

export function MockUnifiedPushAdminClient() {
  return {
    applications: {
      find: findApplicationsMock,
      create: createApplicationMock,
    },
    variants: {
      find: findVariantsMock,
      create: createVariantsMock,
    },
  };
}

export function mockClear() {
  findApplicationsMock.mockClear();
  findVariantsMock.mockClear();
  createVariantsMock.mockClear();
  createApplicationMock.mockClear();
}
