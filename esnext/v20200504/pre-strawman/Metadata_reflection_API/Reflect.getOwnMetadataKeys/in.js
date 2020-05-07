// pre-strawman / Metadata reflection API / Reflect.getOwnMetadataKeys
module.exports = () => {
  return typeof Reflect.getOwnMetadataKeys === 'function';

};