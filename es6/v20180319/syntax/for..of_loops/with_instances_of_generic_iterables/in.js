// syntax / for..of loops / with instances of generic iterables
module.exports = () => {
  $jscomp.initSymbolIterator();
  var result = "";
  var iterable = global.__createIterableObject([1, 2, 3]);
  for (var item of Object.create(iterable)) {
    result += item;
  }
  return result === "123";

};