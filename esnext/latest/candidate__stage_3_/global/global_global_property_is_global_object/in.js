// candidate (stage 3) / global / "global" global property is global object
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  var actualGlobal = Function('return this')();
  actualGlobal.__system_global_test__ = 42;
  return typeof global === 'object' && global && global === actualGlobal && !global.lacksGlobal && global.__system_global_test__ === 42;

};