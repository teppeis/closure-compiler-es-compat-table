// 2021 features / WeakReferences / WeakRef minimal support
module.exports = () => {
  var O = {};
  var weakref = new WeakRef(O);
  return weakref.deref() === O;

};