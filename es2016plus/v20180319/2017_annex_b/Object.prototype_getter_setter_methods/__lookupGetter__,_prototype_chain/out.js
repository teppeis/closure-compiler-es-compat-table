module.exports = function() {
  var a = {get foo() {
    return "bar";
  }, qux:1};
  return "bar" === Object.prototype.__lookupGetter__.call(Object.create(a), "foo")() && void 0 === Object.prototype.__lookupGetter__.call(a, "qux") && void 0 === Object.prototype.__lookupGetter__.call(a, "baz");
};

