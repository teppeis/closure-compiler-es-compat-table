module.exports = function() {
  var b = "11a2bb".matchAll(/(\d)(\D)/g);
  if (b[Symbol.iterator]() !== b) {
    return !1;
  }
  for (var c = "", d = "", e = "", a; !(a = b.next()).done;) {
    c += a.value[0], d += a.value[1], e += a.value[2];
  }
  return "1a2b" === c && "12" === d && "ab" === e;
};

