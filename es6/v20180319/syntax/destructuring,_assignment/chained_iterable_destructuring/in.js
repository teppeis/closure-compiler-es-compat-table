// syntax / destructuring, assignment / chained iterable destructuring
module.exports = function() {
var a,b,c,d;
        [a,b] = [c,d] = [1,2];
        return a === 1 && b === 2 && c === 1 && d === 2;
      
};