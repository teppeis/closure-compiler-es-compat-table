module.exports = function() {
  var a = [3, 4, 5], c = a[0], a = [].slice.call(a, 1), b = [6], d = b[0], b = [].slice.call(b, 1);
  return 3 === c && a instanceof Array && "4,5" === a + "" && 6 === d && b instanceof Array && 0 === b.length;
};

