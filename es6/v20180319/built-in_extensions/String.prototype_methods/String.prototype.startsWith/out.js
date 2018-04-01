module.exports = function() {
  return "function" === typeof String.prototype.startsWith && "foobar".startsWith("foo");
};

