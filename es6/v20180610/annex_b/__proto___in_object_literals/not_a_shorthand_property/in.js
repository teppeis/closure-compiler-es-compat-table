// annex b / __proto__ in object literals / not a shorthand property
module.exports = () => {
  if (!({ __proto__ : [] } instanceof Array)) {
    return false;
  }
  var __proto__ = [];
  return !({ __proto__ } instanceof Array);

};