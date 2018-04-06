// built-ins / Map / Map.prototype.set returns this
module.exports = function() {
  var map = new Map();
  return map.set(0, 0) === map;

};