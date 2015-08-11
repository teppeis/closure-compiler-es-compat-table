module.exports = function() {
  var b = {b:2, z:void 0}, c = void 0 === b.b ? 0 : b.b, d = void 0 === b.z ? 3 : b.z, a = [4, , void 0], e = void 0 === a[0] ? 0 : a[0], f = void 0 === a[1] ? 5 : a[1], a = void 0 === a[2] ? 6 : a[2];
  return 1 === (void 0 === b.a ? 1 : b.a) && 2 === c && 3 === d && 4 === e && 5 === f && 6 === a;
};

