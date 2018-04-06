// syntax / spread (...) operator / with arrays, in array literals
module.exports = function() {
  return [...[1, 2, 3]][2] === 3;

};