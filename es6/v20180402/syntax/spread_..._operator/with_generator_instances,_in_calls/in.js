// syntax / spread (...) operator / with generator instances, in calls
module.exports = function() {
  var iterable = (function*() {
    yield 1;
    yield 2;
    yield 3;
  })();
  return Math.max(...iterable) === 3;
};
