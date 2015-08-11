module.exports = function() {
  var a = {c:7, x:8}, b = a.x, c = a.e;
  return 7 === a.c && 8 === b && void 0 === c && !0 && !0;
};

