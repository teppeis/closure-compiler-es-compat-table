// syntax / spread syntax for iterable objects / with strings, in array literals
module.exports = () => {
  return ["a", ..."bcd", "e"][3] === "d";

};