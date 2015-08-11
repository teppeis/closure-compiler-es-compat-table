module.exports = function() {
  var a = {b:2, c:void 0, x:4}, c = void 0 === a.b ? 0 : a.b, d = void 0 === a.c ? 3 : a.c, e = void 0 === a.x ? 0 : a.x, f = void 0 === a.y ? 5 : a.y, b = [, 7, void 0], g = void 0 === b[0] ? 6 : b[0], h = void 0 === b[1] ? 0 : b[1], b = void 0 === b[2] ? 8 : b[2];
  return 1 === (void 0 === a.a ? 1 : a.a) && 2 === c && 3 === d && 4 === e && 5 === f && 6 === g && 7 === h && 8 === b;
};

