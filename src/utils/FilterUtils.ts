export const normalizeFilter = (filter: {
  [key: string]: string;
}): {[key: string]: string} => {
  const res: {[key: string]: string} = {};
  Object.keys(filter).forEach((key: string) => {
    switch (key.toLowerCase()) {
      case 'name':
        res['name'] = filter[key];
        break;
      case 'variant-id':
        res['variantID'] = filter[key];
        break;
      case 'type':
        res['type'] = filter[key];
        break;
      case 'push-application-id':
        res['pushApplicationID'] = filter[key];
        break;
      default:
        res[key] = filter[key];
    }
  });
  return res;
};
