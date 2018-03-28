// destructuring, parameters: with instances of generic iterables
module.exports = function() {
return function([a, b, c]) {
          return a === 1 && b === 2 && c === undefined;
        }(Object.create(global.__createIterableObject([1, 2])));
      
};
$jscomp.initSymbolIterator();