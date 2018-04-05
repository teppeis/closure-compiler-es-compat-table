module.exports = function() {
  return "function" === typeof String.prototype.endsWith && "foobar".endsWith("bar");
};

