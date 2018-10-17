// syntax / spread syntax for iterable objects / with instances of iterables, in calls
module.exports = () => {
  module.exports._ = Symbol.iterator;
  var iterable = global.__createIterableObject([1, 2, 3]);
  return Math.max(...Object.create(iterable)) === 3;

};