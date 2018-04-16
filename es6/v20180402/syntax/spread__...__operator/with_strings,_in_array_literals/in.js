// syntax / spread (...) operator / with strings, in array literals
module.exports = () => {
  return ["a", ..."bcd", "e"][3] === "d";

};