module.exports = function() {
  var a = {c:7, x:8};
  var b = a.c;
  var c = a.x;
  a = a.e;
  return 7 === b && 8 === c && void 0 === a;
};

