// syntax / destructuring, parameters / iterator closing
module.exports = () => {
  module.exports._ = Symbol.iterator;
  var closed = false;
  var iter = global.__createIterableObject([1, 2, 3], {
    'return': function(){ closed = true; return {}; }
  });
  (function([a,b]) {}(iter));
  return closed;

};