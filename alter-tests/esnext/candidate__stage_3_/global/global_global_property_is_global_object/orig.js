module.exports = function() {
var actualGlobal = Function('return this')();
actualGlobal.__system_global_test__ = 42;
return typeof global === 'object' && global && global === actualGlobal && !global.lacksGlobal && global.__system_global_test__ === 42;

};