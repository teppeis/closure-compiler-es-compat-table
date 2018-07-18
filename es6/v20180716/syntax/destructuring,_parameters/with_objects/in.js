// syntax / destructuring, parameters / with objects
module.exports = () => {
  return function({c, x:d, e}) {
    return c === 7 && d === 8 && e === undefined;
  }({c:7, x:8});

};