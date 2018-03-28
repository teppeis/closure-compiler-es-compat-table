// spread (...) operator: with instances of iterables, in arrays
module.exports = function() {
var iterable = global.__createIterableObject(["b", "c", "d"]);
        return ["a", ...Object.create(iterable), "e"][3] === "d";
      
};
$jscomp.initSymbolIterator();