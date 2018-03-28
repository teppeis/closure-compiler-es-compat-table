module.exports = function() {
  var a = {};
  a[Symbol.toStringTag] = "foo";
  return "[object foo]" === a + "";
};

