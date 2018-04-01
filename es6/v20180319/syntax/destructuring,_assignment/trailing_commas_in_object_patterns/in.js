// syntax / destructuring, assignment / trailing commas in object patterns
module.exports = function() {
var a;
        ({a,} = {a:1});
        return a === 1;
      
};