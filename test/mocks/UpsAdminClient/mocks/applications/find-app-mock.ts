import {
  PushApplication,
  PushApplicationFilter,
} from '@aerogear/unifiedpush-admin-client';
import {utils} from '../../../../utils/Utils';
import {SearchResult} from '@aerogear/unifiedpush-admin-client/dist/src/commands/applications/search/AbstractSearchCommand';

export const findApplicationsMock = jest.fn(
  (
    pushAppArray: PushApplication[],
    filter: PushApplicationFilter | undefined,
    page: number
  ): SearchResult => {
    const apps = utils.applyPushApplicationFilter(pushAppArray, filter);
    return {
      list: apps,
      total: apps.length,
    };
  }
);
