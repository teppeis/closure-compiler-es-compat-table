// functions / generators / generator function expressions
module.exports = () => {
  var generator = function * (){
    yield 5; yield 6;
  };
  var iterator = generator();
  var item = iterator.next();
  var passed = item.value === 5 && item.done === false;
  item = iterator.next();
  passed &= item.value === 6 && item.done === false;
  item = iterator.next();
  passed &= item.value === void undefined && item.done === true;
  return passed;

};