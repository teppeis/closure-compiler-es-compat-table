// built-ins / Symbol / can convert with String()
module.exports = () => {
  return String(Symbol("foo")) === "Symbol(foo)";

};