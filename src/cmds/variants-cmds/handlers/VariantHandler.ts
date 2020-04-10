import {Variant} from '@aerogear/unifiedpush-admin-client';
import {Arguments} from 'yargs';

export interface VariantHandler {
  handle(argv: Arguments, def: {}): Promise<Variant>;
}
