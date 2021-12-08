// built-in extensions / Array static methods / Array.from, iterator closing
module.exports = () => {
  module.exports._ = Symbol.iterator;
  var closed = false;
  var iter = global.__createIterableObject([1, 2, 3], {
    'return': function(){ closed = true; return {}; }
  });
  try {
    Array.from(iter, function() { throw 42 });
  } catch(e){}
  return closed;

};