// destructuring, parameters: defaults, arrow function
module.exports = function() {
return ((a, {b = 0, c = 3}) => {
          return a === 1 && b === 2 && c === 3;
        })(1, {b: 2});
      
};