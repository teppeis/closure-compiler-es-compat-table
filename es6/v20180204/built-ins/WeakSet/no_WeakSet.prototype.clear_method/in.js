// built-ins / WeakSet / no WeakSet.prototype.clear method
module.exports = () => {
  if (!("clear" in WeakSet.prototype)) {
    return true;
  }
  var s = new WeakSet();
  var key = {};
  s.add(key);
  s.clear();
  return s.has(key);

};