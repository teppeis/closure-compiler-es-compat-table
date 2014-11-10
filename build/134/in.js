// destructuring: defaults in parameters
module.exports = function() {

        return (function({a = 1, b = 0, c = 3, x:d = 0, y:e = 5, z:f}) {
          return a === 1 && b === 2 && c === 3 && d === 4 && 
            e === 5 && f === undefined;
        }({b:2, c:undefined, x:4}));
      
};