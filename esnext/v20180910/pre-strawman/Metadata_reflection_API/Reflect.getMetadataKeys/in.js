// pre-strawman / Metadata reflection API / Reflect.getMetadataKeys
module.exports = () => {
  return typeof Reflect.getMetadataKeys == 'function';

};