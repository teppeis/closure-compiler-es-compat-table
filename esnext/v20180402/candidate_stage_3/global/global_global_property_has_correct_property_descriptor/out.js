module.exports = function() {
  var a = Function("return this")();
  if ("object" !== typeof global || !("global" in a) || Object.prototype.propertyIsEnumerable.call(a, "global")) {
    return !1;
  }
  if ("function" !== typeof Object.getOwnPropertyDescriptor) {
    return !0;
  }
  var b = Object.getOwnPropertyDescriptor(a, "global");
  return b.value === a && !b.enumerable && b.configurable && b.writable;
};

