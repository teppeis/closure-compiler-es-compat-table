module.exports = function() {
  var a = {set foo(b) {
    return "bar";
  }, qux:1};
  return "bar" === Object.prototype.__lookupSetter__.call(a, "foo")() && void 0 === Object.prototype.__lookupSetter__.call(a, "qux") && void 0 === Object.prototype.__lookupSetter__.call(a, "baz");
};

