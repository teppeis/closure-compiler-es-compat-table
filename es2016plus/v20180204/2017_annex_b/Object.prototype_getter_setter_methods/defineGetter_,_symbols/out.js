module.exports = function() {
  function b() {
    return "bar";
  }
  var a = {}, c = Symbol();
  Object.prototype.__defineGetter__.call(a, c, b);
  a = Object.getOwnPropertyDescriptor(a, c);
  return a.get === b && !a.writable && a.configurable && a.enumerable;
};

