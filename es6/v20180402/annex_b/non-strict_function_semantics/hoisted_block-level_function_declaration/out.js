module.exports = function() {
  if (!this) {
    return !1;
  }
  var a = 1 & "undefined" === typeof g;
  a &= 1 === g();
  return a & 0;
};

