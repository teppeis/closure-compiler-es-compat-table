module.exports = function() {
  var a = Symbol();
  try {
    return a + "", !1;
  } catch (b) {
  }
  try {
    return a + 0, !1;
  } catch (b) {
  }
  return !0;
};

