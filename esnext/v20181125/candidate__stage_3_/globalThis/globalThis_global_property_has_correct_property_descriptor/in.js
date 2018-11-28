// candidate (stage 3) / globalThis / "globalThis" global property has correct property descriptor
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  var actualGlobal = Function('return this')();
  if (typeof globalThis !== 'object') { return false; }
  if (!('globalThis' in actualGlobal)) { return false; }
  if (Object.prototype.propertyIsEnumerable.call(actualGlobal, 'globalThis')) { return false; }
  var descriptor = Object.getOwnPropertyDescriptor(actualGlobal, 'globalThis');
  return descriptor.value === actualGlobal && !descriptor.enumerable && descriptor.configurable && descriptor.writable;

};