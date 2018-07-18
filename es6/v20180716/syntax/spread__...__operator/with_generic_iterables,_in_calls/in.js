// syntax / spread (...) operator / with generic iterables, in calls
module.exports = () => {
  $jscomp.initSymbolIterator();
  var iterable = global.__createIterableObject([1, 2, 3]);
  return Math.max(...iterable) === 3;

};