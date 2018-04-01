// syntax / destructuring, declarations / with sparse arrays
module.exports = function() {
var [a, , b] = [,,,];
        return a === undefined && b === undefined;
      
};