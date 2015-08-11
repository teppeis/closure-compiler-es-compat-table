// destructuring: with generic iterables
module.exports = function() {

        var [a, b, c] = global.__createIterableObject([1, 2]);
        var d, e;
        [d, e] = global.__createIterableObject([3, 4]);
        return a === 1 && b === 2 && c === undefined
          && d === 3 && e === 4;
      
};