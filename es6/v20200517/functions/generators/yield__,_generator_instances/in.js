// functions / generators / yield *, generator instances
module.exports = () => {
  var iterator = (function * generator() {
    yield * (function*(){ yield 5; yield 6; yield 7; }());
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