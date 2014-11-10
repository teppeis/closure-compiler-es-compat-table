// destructuring: destructuring defaults
module.exports = function() {

        var {a = 1, b = 0, c = 3} = {b:2, c:undefined};
        return a === 1 && b === 2 && c === 3;
      
};