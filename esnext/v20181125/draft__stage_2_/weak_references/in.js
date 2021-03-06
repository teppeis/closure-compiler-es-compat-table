// draft (stage 2) / weak references
module.exports = () => {
  var O = {};
  var weakref = System.makeWeakRef(O);
  var works = weakref.get() === O;
  weakref.clear();
  return works && weakref.get() === undefined;

};