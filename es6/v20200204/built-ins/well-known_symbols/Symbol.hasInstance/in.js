// built-ins / well-known symbols / Symbol.hasInstance
module.exports = () => {
  var passed = false;
  var obj = { foo: true };
  var C = function(){};
  Object.defineProperty(C, Symbol.hasInstance, {
    value: function(inst) { passed = inst.foo; return false; }
  });
  obj instanceof C;
  return passed;

};