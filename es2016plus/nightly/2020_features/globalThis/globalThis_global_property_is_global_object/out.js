module.exports = function() {
  ensureUsed(globalThis);
  var a = Function("return this")();
  a.__system_global_test__ = 42;
  return "object" === typeof globalThis && globalThis && globalThis === a && !globalThis.lacksGlobalThis && 42 === globalThis.__system_global_test__;
};

