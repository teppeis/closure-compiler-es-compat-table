// syntax / destructuring, declarations / with generator instances
module.exports = function() {
var [a, b, c] = (function*(){ yield 1; yield 2; }());
        return a === 1 && b === 2 && c === undefined;
      
};