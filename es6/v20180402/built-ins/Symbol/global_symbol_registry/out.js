module.exports = function() {
  var a = Symbol.for("foo");
  return Symbol.for("foo") === a && "foo" === Symbol.keyFor(a);
};

