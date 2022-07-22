module.exports = function() {
  var a, b = 0, c = 1;
  null != a || (a = 2);
  null != b || (b = 2);
  null != c || (c = 2);
  return 2 === a && 0 === b && 1 === c;
};

