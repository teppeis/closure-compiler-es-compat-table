// syntax / spread (...) operator / with generic iterables, in arrays
module.exports = function() {
var iterable = global.__createIterableObject(["b", "c", "d"]);
        return ["a", ...iterable, "e"][3] === "d";
      
};
$jscomp.initSymbolIterator();