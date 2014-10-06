// generators (yield)
module.exports = function() {

    var generator = (function* () {
      yield* (function* () {
        yield 5; yield 6;
      }());
    }());

    var item = generator.next();
    var passed = item.value === 5 && item.done === false;
    item = generator.next();
    passed    &= item.value === 6 && item.done === false;
    item = generator.next();
    passed    &= item.value === undefined && item.done === true;
    return passed;
  
};