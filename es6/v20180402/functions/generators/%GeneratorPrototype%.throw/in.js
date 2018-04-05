// functions / generators / %GeneratorPrototype%.throw
module.exports = function() {
  var passed = false;
  function* generator() {
    try {
      yield 5;
      yield 6;
    } catch (e) {
      passed = e === "foo";
    }
  }
  var iterator = generator();
  iterator.next();
  iterator.throw("foo");
  return passed;
};
