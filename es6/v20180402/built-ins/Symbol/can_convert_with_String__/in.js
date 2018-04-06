// built-ins / Symbol / can convert with String()
module.exports = function() {
  return String(Symbol("foo")) === "Symbol(foo)";

};