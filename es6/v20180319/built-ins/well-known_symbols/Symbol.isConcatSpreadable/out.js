module.exports = function() {
  var a = [], b = [];
  b[Symbol.isConcatSpreadable] = !1;
  a = a.concat(b);
  return a[0] === b;
};

