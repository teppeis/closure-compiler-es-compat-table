// destructuring, assignment: defaults
module.exports = function() {
var a,b,c,d,e,f;
        ({a = 1, b = 0, z:c = 3} = {b:2, z:undefined});
        [d = 0, e = 5, f = 6] = [4,,undefined];
        return a === 1 && b === 2 && c === 3
          && d === 4 && e === 5 && f === 6;
      
};