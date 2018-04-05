// syntax / spread (...) operator / spreading non-iterables is a runtime error
module.exports = function() {
  try {
    Math.max(...2);
  } catch (e) {
    return Math.max(...[1, 2, 3]) === 3;
  }
};
