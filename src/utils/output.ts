import {table} from 'table';

interface PrintParams<T> {
  intro?: string;
  headers?: string[];
  properties?: string[];
  format?: string;
  value?: Array<T>;
  transformer?: (obj: T) => Record<string, string>;
  trailer?: string;
}
export const generateOutput = <T>({
  intro,
  headers,
  properties,
  format = 'table',
  value,
  transformer = (obj: T) => (obj as unknown) as Record<string, string>,
  trailer,
}: PrintParams<T>) => {
  if (format === 'json') {
    return value ? JSON.stringify(value) : '';
  }
  if (format === 'table') {
    let res = intro ? `${intro}\n\n` : '';
    if (headers && properties && value) {
      const data = [headers];
      value
        .map(v => properties.map(prop => transformer(v)[prop]))
        .forEach(v => data.push(v as string[]));
      res += table(data);
    }
    res += trailer ? trailer : '';
    return res;
  }
  return '';
};
