module.exports = function() {
  function b() {
    return "bar";
  }
  var a = {};
  Object.prototype.__defineGetter__.call(a, "foo", b);
  a = Object.getOwnPropertyDescriptor(a, "foo");
  return a.get === b && !a.writable && a.configurable && a.enumerable;
};

