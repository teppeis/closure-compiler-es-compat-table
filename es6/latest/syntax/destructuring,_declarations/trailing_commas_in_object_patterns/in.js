// syntax / destructuring, declarations / trailing commas in object patterns
module.exports = function() {
  var {a,} = {a:1};
  return a === 1;

};