import {Variant} from '@aerogear/unifiedpush-admin-client';
import {findVariantsMock} from './find-mock';
import {VariantFilter} from '@aerogear/unifiedpush-admin-client/dist/src/commands/variants/Variant';

// export const deleteVariantsMock = jest.fn(
//   (appId: string, filter: Record<string, string>): Variant[] => {
//     return findVariantsMock(appId, filter);
//   }
// );

export const deleteVariantsMock = jest.fn(
  (pushVariantArray: Variant[], filter: VariantFilter | undefined): {} => ({
    array: pushVariantArray.shift(),
  })
);
