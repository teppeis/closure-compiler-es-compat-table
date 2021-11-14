module.exports = function() {
  var a = 1, b = 1;
  null != a || (a = ++b);
  return 1 === a && 1 === b;
};

