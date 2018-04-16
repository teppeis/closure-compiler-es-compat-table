// built-ins / WeakMap / basic functionality
module.exports = () => {
  var key = {};
  var weakmap = new WeakMap();
  weakmap.set(key, 123);
  return weakmap.has(key) && weakmap.get(key) === 123;

};