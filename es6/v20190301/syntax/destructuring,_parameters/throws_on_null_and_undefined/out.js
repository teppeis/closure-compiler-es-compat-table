module.exports = function() {
  var a = "pass a", b = "pass b";
  try {
    return a = null.c, !1;
  } catch (c) {
  }
  try {
    return b = (void 0).d, !1;
  } catch (c) {
  }
  return "pass a" === a && "pass b" === b;
};

