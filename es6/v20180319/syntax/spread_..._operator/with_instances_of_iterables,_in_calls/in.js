// syntax / spread (...) operator / with instances of iterables, in calls
module.exports = function() {
  var iterable = global.__createIterableObject([1, 2, 3]);
  return Math.max(...Object.create(iterable)) === 3;
};
$jscomp.initSymbolIterator();
