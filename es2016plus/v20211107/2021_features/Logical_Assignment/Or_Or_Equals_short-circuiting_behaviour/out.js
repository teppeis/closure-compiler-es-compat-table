module.exports = function() {
  var a = 1, b = 1;
  a || (a = ++b);
  return 1 === a && 1 === b;
};

