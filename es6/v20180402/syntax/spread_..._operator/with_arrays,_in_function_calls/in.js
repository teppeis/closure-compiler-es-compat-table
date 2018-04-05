// syntax / spread (...) operator / with arrays, in function calls
module.exports = function() {
  return Math.max(...[1, 2, 3]) === 3;
};
