// built-ins / WeakSet / constructor accepts null
module.exports = function() {
  new WeakSet(null);
  return true;

};