module.exports = function() {
  var a, b = 1;
  a && (a = ++b);
  return "undefined" === typeof a && 1 === b;
};

