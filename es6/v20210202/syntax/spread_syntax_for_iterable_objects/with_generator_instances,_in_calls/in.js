// syntax / spread syntax for iterable objects / with generator instances, in calls
module.exports = () => {
  var iterable = (function*(){ yield 1; yield 2; yield 3; }());
  return Math.max(...iterable) === 3;

};