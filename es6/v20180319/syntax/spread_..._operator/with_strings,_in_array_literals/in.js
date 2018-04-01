// syntax / spread (...) operator / with strings, in array literals
module.exports = function() {
  return ["a", ..."bcd", "e"][3] === "d";
};
