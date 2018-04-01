module.exports = function() {
  return function(a, b, c) {
    a = void 0 === a ? "baz" : a;
    b = void 0 === b ? "qux" : b;
    c = void 0 === c ? "quux" : c;
    a = "corge";
    return 2 === arguments.length && "foo" === arguments[0] && "bar" === arguments[1];
  }("foo", "bar");
};

