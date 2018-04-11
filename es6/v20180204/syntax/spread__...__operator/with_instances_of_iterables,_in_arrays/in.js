// syntax / spread (...) operator / with instances of iterables, in arrays
module.exports = function() {
  $jscomp.initSymbolIterator();
  var iterable = global.__createIterableObject(["b", "c", "d"]);
  return ["a", ...Object.create(iterable), "e"][3] === "d";

};