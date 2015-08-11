// destructuring: with instances of generic iterables
module.exports = function() {

        var [a, b, c] = Object.create(global.__createIterableObject([1, 2]))
        var d, e;
        [d, e] = Object.create(global.__createIterableObject([3, 4]));
        return a === 1 && b === 2 && c === undefined
          && d === 3 && e === 4;
      
};