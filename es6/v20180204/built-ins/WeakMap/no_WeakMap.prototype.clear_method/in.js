// built-ins / WeakMap / no WeakMap.prototype.clear method
module.exports = () => {
  if (!("clear" in WeakMap.prototype)) {
    return true;
  }
  var m = new WeakMap();
  var key = {};
  m.set(key, 2);
  m.clear();
  return m.has(key);

};