// built-ins / Set / Set.prototype.add returns this
module.exports = function() {
  var set = new Set();
  return set.add(0) === set;
};
