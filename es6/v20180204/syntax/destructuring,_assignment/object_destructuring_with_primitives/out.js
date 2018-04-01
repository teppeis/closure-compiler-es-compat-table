module.exports = function() {
  var a = (2).toFixed;
  var b = "".slice;
  return a === Number.prototype.toFixed && b === String.prototype.slice;
};

