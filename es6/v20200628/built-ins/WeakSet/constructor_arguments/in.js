// built-ins / WeakSet / constructor arguments
module.exports = () => {
  var obj1 = {}, obj2 = {};
  var weakset = new WeakSet([obj1, obj2]);
  return weakset.has(obj1) && weakset.has(obj2);

};