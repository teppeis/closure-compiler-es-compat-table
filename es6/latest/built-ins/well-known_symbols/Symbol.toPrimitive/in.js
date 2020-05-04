// built-ins / well-known symbols / Symbol.toPrimitive
module.exports = () => {
  var a = {}, b = {}, c = {};
  var passed = 0;
  a[Symbol.toPrimitive] = function(hint) { passed += hint === "number";  return 0; };
  b[Symbol.toPrimitive] = function(hint) { passed += hint === "string";  return 0; };
  c[Symbol.toPrimitive] = function(hint) { passed += hint === "default"; return 0; };
  a >= 0;
  b in {};
  c === 0;
  return passed === 3;

};