// destructuring parameters
module.exports = function() {

    return (function({a, x:b}, [c, d]) {
      return a === 1 && b === 2 && c === 3 && d === 4;
    }({a:1, x:2},[3, 4]));
  
};