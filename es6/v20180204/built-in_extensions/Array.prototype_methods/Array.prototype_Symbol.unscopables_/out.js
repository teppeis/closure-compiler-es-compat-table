module.exports = function() {
  var c = Array.prototype[Symbol.unscopables];
  if (!c) {
    return !1;
  }
  for (var b = "find findIndex fill copyWithin entries keys values".split(" "), a = 0; a < b.length; a++) {
    if (Array.prototype[b[a]] && !c[b[a]]) {
      return !1;
    }
  }
  return !0;
};

