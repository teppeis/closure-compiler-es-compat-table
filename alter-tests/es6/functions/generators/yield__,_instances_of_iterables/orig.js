// functions / generators / yield *, instances of iterables
module.exports = () => {
  module.exports._ = Symbol.iterator;
  var iterator = (function * generator() {
    yield * Object.create(__createIterableObject([5, 6, 7]));
  }());
  var item = iterator.next();
  var passed = item.value === 5 && item.done === false;
  item = iterator.next();
  passed &= item.value === 6 && item.done === false;
  item = iterator.next();
  passed &= item.value === 7 && item.done === false;
  item = iterator.next();
  passed &= item.value === void undefined && item.done === true;
  return passed;

};