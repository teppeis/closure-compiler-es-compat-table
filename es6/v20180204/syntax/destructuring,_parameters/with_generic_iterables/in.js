// syntax / destructuring, parameters / with generic iterables
module.exports = function() {
return function([a, b, c]) {
          return a === 1 && b === 2 && c === undefined;
        }(global.__createIterableObject([1, 2]));
      
};
$jscomp.initSymbolIterator();