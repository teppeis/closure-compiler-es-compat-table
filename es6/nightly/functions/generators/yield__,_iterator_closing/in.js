// functions / generators / yield *, iterator closing
module.exports = () => {
  module.exports._ = Symbol.iterator;
  var closed = '';
  var iter = __createIterableObject([1, 2, 3], {
    'return': function(){
      closed += 'a';
      return {done: true};
    }
  });
  var gen = (function* generator(){
    try {
      yield *iter;
    } finally {
      closed += 'b';
    }
  })();
  gen.next();
  gen['return']();
  return closed === 'ab';

};