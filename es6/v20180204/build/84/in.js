// destructuring, assignment: with generator instances
module.exports = function() {
var a,b,c;
        [a, b, c] = (function*(){ yield 1; yield 2; }());
        return a === 1 && b === 2 && c === undefined;
      
};