// 2020 features / globalThis / "globalThis" global property has correct property descriptor
module.exports = () => {
  // ensure polyfill insertion
  // see https://github.com/google/closure-compiler/issues/3519
  ensureUsed(globalThis);
  var actualGlobal = Function('return this')();
  if (typeof globalThis !== 'object') { return false; }
  if (!('globalThis' in actualGlobal)) { return false; }
  if (Object.prototype.propertyIsEnumerable.call(actualGlobal, 'globalThis')) { return false; }
  var descriptor = Object.getOwnPropertyDescriptor(actualGlobal, 'globalThis');
  return descriptor.value === actualGlobal && !descriptor.enumerable && descriptor.configurable && descriptor.writable;

};
