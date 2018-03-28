// spread (...) operator: with generic iterables, in calls
module.exports = function() {
var iterable = global.__createIterableObject([1, 2, 3]);
        return Math.max(...iterable) === 3;
      
};
$jscomp.initSymbolIterator();