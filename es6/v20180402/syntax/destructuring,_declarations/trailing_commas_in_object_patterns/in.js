// syntax / destructuring, declarations / trailing commas in object patterns
module.exports = () => {
  var {a,} = {a:1};
  return a === 1;

};