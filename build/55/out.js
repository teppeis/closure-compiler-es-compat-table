module.exports = function() {
  var c = "ab"[0], d = "ab"[1], e = "ab"[2], a, b;
  a = "de"[0];
  b = "de"[1];
  return "a" === c && "b" === d && void 0 === e && "d" === a && "e" === b;
};

