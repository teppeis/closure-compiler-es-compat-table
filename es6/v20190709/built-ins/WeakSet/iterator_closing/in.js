// built-ins / WeakSet / iterator closing
module.exports = () => {
  module.exports._ = Symbol.iterator;
  var closed = false;
  var iter = global.__createIterableObject([1, 2, 3], {
    'return': function(){ closed = true; return {}; }
  });
  try {
    new WeakSet(iter);
  } catch(e){}
  return closed;

};