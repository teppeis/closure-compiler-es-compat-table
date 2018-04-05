// annex b / __proto__ in object literals / not a computed property
module.exports = function() {
  if (!({ __proto__: [] } instanceof Array)) {
    return false;
  }
  var a = "__proto__";
  return !({ [a]: [] } instanceof Array);
};
