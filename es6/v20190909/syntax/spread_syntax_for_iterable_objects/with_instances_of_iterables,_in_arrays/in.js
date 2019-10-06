// syntax / spread syntax for iterable objects / with instances of iterables, in arrays
module.exports = () => {
  module.exports._ = Symbol.iterator;
  var iterable = global.__createIterableObject(["b", "c", "d"]);
  return ["a", ...Object.create(iterable), "e"][3] === "d";

};