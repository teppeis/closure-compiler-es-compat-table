module.exports = function() {
  var a = Function("return this")();
  a.__system_global_test__ = 42;
  return "object" === typeof global && global && global === a && !global.lacksGlobal && 42 === global.__system_global_test__;
};

