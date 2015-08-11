module.exports = function() {
  return function(b, c) {
    for (var a = 1;a < arguments.length;++a) {
    }
    b = "qux";
    return 3 === arguments.length && "foo" === arguments[0] && "bar" === arguments[1] && "baz" === arguments[2];
  }("foo", "bar", "baz");
};

