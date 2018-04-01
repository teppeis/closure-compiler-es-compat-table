// functions / generators / %GeneratorPrototype%.constructor
module.exports = function() {
  function* g() {}
  var iterator = new g.constructor("a", "b", "c", "yield a; yield b; yield c;")(
    5,
    6,
    7
  );
  var item = iterator.next();
  var passed = item.value === 5 && item.done === false;
  item = iterator.next();
  passed &= item.value === 6 && item.done === false;
  item = iterator.next();
  passed &= item.value === 7 && item.done === false;
  item = iterator.next();
  passed &= item.value === undefined && item.done === true;

  passed &= g.constructor === function*() {}.constructor;
  return passed;
};
