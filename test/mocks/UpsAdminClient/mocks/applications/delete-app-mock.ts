import {
  PushApplication,
  PushApplicationFilter,
} from '@aerogear/unifiedpush-admin-client';
import {utils} from '../../../../utils/Utils';

export const deleteApplicationMock = jest.fn(
  (
    pushAppArray: PushApplication[],
    filter: PushApplicationFilter | undefined
  ): {} => ({
    list: utils.applyPushApplicationFilter(pushAppArray, filter),
    array: [],
  })
  // (pushAppArray: PushApplication[], filter: PushApplicationFilter): {} => ({
  //   list: utils.applyPushApplicationFilter(pushAppArray, filter),
);

// export const deleteApplicationMock = jest.fn(
//     (filter: Record<string, string>): PushApplication[] => {
//         return [];
//     }
// );
