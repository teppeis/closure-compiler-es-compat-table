// built-ins / WeakSet / basic functionality
module.exports = () => {
  var obj1 = {};
  var weakset = new WeakSet();
  weakset.add(obj1);
  weakset.add(obj1);
  return weakset.has(obj1);

};