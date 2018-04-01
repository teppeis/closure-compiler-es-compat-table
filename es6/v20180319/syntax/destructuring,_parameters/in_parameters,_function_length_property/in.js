// syntax / destructuring, parameters / in parameters, function 'length' property
module.exports = function() {
  return function({ a, b }, [c, d]) {}.length === 2;
};
