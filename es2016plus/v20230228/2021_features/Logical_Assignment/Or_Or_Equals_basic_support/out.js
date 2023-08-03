module.exports = function() {
  var a, b = 0, c = 1;
  a || (a = 2);
  b || (b = 2);
  c || (c = 2);
  return 2 === a && 2 === b && 1 === c;
};

