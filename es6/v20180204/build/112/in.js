// destructuring, parameters: trailing commas in iterable patterns
module.exports = function() {
return function([a,]) {
          return a === 1;
        }([1]);
      
};