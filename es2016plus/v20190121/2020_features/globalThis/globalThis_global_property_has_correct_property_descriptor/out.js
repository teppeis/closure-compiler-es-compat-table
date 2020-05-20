module.exports = function() {
  ensureUsed(globalThis);
  var a = Function("return this")();
  if ("object" !== typeof globalThis || !("globalThis" in a) || Object.prototype.propertyIsEnumerable.call(a, "globalThis")) {
    return !1;
  }
  var b = Object.getOwnPropertyDescriptor(a, "globalThis");
  return b.value === a && !b.enumerable && b.configurable && b.writable;
};

