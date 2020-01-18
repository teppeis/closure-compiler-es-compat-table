module.exports = function() {
  function b() {
  }
  var a = {};
  Object.prototype.__defineSetter__.call(a, "foo", b);
  a = Object.getOwnPropertyDescriptor(a, "foo");
  return a.set === b && !a.writable && a.configurable && a.enumerable;
};

