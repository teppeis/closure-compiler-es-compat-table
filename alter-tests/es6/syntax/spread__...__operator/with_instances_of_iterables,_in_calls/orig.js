// syntax / spread (...) operator / with instances of iterables, in calls
module.exports = function() {
  $jscomp.initSymbolIterator();
  var iterable = global.__createIterableObject([1, 2, 3]);
  return Math.max(...Object.create(iterable)) === 3;

};