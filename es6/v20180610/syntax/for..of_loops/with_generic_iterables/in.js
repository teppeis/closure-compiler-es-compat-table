// syntax / for..of loops / with generic iterables
module.exports = () => {
  $jscomp.initSymbolIterator();
  var result = "";
  var iterable = global.__createIterableObject([1, 2, 3]);
  for (var item of iterable) {
    result += item;
  }
  return result === "123";

};