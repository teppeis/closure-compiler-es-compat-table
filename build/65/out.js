module.exports = function() {
  var c = (2).toFixed, d = "".slice, a, b;
  a = (2).toString;
  b = "".match;
  return c === Number.prototype.toFixed && a === Number.prototype.toString && d === String.prototype.slice && b === String.prototype.match;
};

