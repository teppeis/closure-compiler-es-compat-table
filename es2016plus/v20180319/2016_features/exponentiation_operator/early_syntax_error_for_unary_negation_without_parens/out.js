module.exports = function() {
  if (8 !== Math.pow(2, 3)) {
    return !1;
  }
  try {
    Function("-5 ** 2")();
  } catch (a) {
    return !0;
  }
};
