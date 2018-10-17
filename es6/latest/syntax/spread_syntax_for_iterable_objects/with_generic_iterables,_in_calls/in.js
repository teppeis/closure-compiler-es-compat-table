// syntax / spread syntax for iterable objects / with generic iterables, in calls
module.exports = () => {
  module.exports._ = Symbol.iterator;
  var iterable = global.__createIterableObject([1, 2, 3]);
  return Math.max(...iterable) === 3;

};