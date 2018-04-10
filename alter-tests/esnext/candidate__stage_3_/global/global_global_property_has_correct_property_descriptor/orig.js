// candidate (stage 3) / global / "global" global property has correct property descriptor
module.exports = function() {
  var actualGlobal = Function('return this')();
  if (typeof global !== 'object') { return false; }
  if (!('global' in actualGlobal)) { return false; }
  if (Object.prototype.propertyIsEnumerable.call(actualGlobal, 'global')) { return false; }
  if (typeof Object.getOwnPropertyDescriptor !== 'function') { return true; } // ES3
  var descriptor = Object.getOwnPropertyDescriptor(actualGlobal, 'global');
  return descriptor.value === actualGlobal && !descriptor.enumerable && descriptor.configurable && descriptor.writable;

};