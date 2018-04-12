// built-ins / WeakSet / WeakSet.prototype.add returns this
module.exports = function() {
  var weakset = new WeakSet();
  var obj = {};
  return weakset.add(obj) === weakset;

};