// built-in extensions / Array static methods / Array.from, generic iterables
module.exports = () => {
  $jscomp.initSymbolIterator();
  var iterable = global.__createIterableObject([1, 2, 3]);
  return Array.from(iterable) + '' === "1,2,3";

};