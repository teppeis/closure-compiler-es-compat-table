// built-ins / Map / Map.prototype isn't an instance
module.exports = function() {
  new Map();
  var obj = {};
  try {
    Map.prototype.has(obj);
  } catch (e) {
    return true;
  }
};
