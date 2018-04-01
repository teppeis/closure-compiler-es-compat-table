// syntax / destructuring, assignment / iterable destructuring expression
module.exports = function() {
var a, b, iterable = [1,2];
        return ([a, b] = iterable) === iterable;
      
};