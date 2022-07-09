export const transformMongooseEntity = <P>(x?: any): undefined | P => {
  if (!x) {
    return undefined;
  }
  const entity: any = {};
  Object.keys(x)
    .filter(key => key !== '_id')
    .forEach(key => (entity[key] = x[key]));
  entity.id = x._id.toString();
  return entity;
}
