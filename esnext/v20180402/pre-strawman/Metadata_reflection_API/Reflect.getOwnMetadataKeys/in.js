// pre-strawman / Metadata reflection API / Reflect.getOwnMetadataKeys
module.exports = function() {
  return typeof Reflect.getOwnMetadataKeys == 'function';

};