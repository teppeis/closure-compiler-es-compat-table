// syntax / spread (...) operator / with generic iterables, in arrays
module.exports = function() {
  $jscomp.initSymbolIterator();
  var iterable = global.__createIterableObject(["b", "c", "d"]);
  return ["a", ...iterable, "e"][3] === "d";

};