// built-ins / WeakSet / WeakSet.prototype isn't an instance
module.exports = function() {
  new WeakSet();
  var obj = {};
  try {
    WeakSet.prototype.has(obj);
  } catch (e) {
    return true;
  }
};
