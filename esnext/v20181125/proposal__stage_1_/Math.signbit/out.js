module.exports = function() {
  return !1 === Math.signbit(-0) && !0 === Math.signbit(0) && !1 === Math.signbit(-42) && !0 === Math.signbit(42);
};

