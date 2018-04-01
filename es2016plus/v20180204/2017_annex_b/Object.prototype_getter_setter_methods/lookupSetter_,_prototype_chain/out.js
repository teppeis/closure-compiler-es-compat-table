module.exports = function() {
  var a = {set foo(a) {
    return "bar";
  }, qux:1};
  return "bar" === Object.prototype.__lookupSetter__.call(Object.create(a), "foo")() && void 0 === Object.prototype.__lookupSetter__.call(a, "qux") && void 0 === Object.prototype.__lookupSetter__.call(a, "baz");
};

