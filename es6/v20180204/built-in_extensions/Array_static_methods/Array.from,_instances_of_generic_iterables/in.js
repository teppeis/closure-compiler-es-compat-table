// built-in extensions / Array static methods / Array.from, instances of generic iterables
module.exports = () => {
  $jscomp.initSymbolIterator();
  var iterable = global.__createIterableObject([1, 2, 3]);
  return Array.from(Object.create(iterable)) + '' === "1,2,3";

};