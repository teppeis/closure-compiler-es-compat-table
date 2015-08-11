module.exports = function() {
  var b = [9, {x:10}], a = b[1], c = a.x, a = a.g;
  return 9 === b[0] && 10 === c && void 0 === a && !0 && !0;
};

