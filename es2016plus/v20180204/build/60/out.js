module.exports = function() {
  function b(a) {
  }
  var a = {}, c = Symbol();
  Object.prototype.__defineSetter__.call(a, c, b);
  a = Object.getOwnPropertyDescriptor(a, c);
  return a.set === b && !a.writable && a.configurable && a.enumerable;
};

