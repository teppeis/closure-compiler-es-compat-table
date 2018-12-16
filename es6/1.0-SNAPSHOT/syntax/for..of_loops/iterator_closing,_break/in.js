// syntax / for..of loops / iterator closing, break
module.exports = () => {
  module.exports._ = Symbol.iterator;
  var closed = false;
  var iter = __createIterableObject([1, 2, 3], {
    'return': function(){ closed = true; return {}; }
  });
  for (var it of iter) break;
  return closed;

};