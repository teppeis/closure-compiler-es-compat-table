// functions / generators / yield *, iterator closing via throw()
module.exports = () => {
  module.exports._ = Symbol.iterator;
  var closed = false;
  var iter = global.__createIterableObject([1, 2, 3], {
    'throw': undefined,
    'return': function() {
      closed = true;
      return {done: true};
    }
  });
  var gen = (function*(){
    try {
      yield *iter;
    } catch(e){}
  })();
  gen.next();
  gen['throw']();
  return closed;

};