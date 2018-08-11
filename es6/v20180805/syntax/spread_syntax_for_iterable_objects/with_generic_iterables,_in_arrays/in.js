// syntax / spread syntax for iterable objects / with generic iterables, in arrays
module.exports = () => {
  $jscomp.initSymbolIterator();
  var iterable = global.__createIterableObject(["b", "c", "d"]);
  return ["a", ...iterable, "e"][3] === "d";

};