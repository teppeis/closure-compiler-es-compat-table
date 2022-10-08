// syntax / destructuring, parameters / trailing commas in object patterns
module.exports = () => {
  return function({a,}) {
    return a === 1;
  }({a:1});

};