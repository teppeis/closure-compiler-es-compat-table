// annex b / __proto__ in object literals / not a shorthand method
module.exports = () => {
  if (!({ __proto__ : [] } instanceof Array)) {
    return false;
  }
  return !({ __proto__(){} } instanceof Function);

};