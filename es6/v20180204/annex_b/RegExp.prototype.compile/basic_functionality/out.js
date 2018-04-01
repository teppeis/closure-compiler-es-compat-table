module.exports = function() {
  if ("function" !== typeof RegExp.prototype.compile) {
    return !1;
  }
  var a = /a/;
  a.compile("b");
  return a.test("b");
};

