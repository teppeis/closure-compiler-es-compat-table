// 2020 features / globalThis / "globalThis" global property is global object
module.exports = () => {
  // ensure polyfill insertion
  // see https://github.com/google/closure-compiler/issues/3519
  ensureUsed(globalThis);
  var actualGlobal = Function('return this')();
  actualGlobal.__system_global_test__ = 42;
  return typeof globalThis === 'object' && globalThis && globalThis === actualGlobal && !globalThis.lacksGlobalThis && globalThis.__system_global_test__ === 42;

};
