module.exports = function() {
  var b = "pass a", c = "pass b";
  try {
    return b = null.a, !1;
  } catch (a) {
    if (!(a instanceof TypeError)) {
      return !1;
    }
  }
  try {
    return c = (void 0).b, !1;
  } catch (a) {
    if (!(a instanceof TypeError)) {
      return !1;
    }
  }
  return "pass a" === b && "pass b" === c;
};

