// built-ins / well-known symbols / Symbol.isConcatSpreadable
module.exports = function() {
  var a = [],
    b = [];
  b[Symbol.isConcatSpreadable] = false;
  a = a.concat(b);
  return a[0] === b;
};
