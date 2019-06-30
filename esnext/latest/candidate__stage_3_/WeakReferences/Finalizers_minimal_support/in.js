// candidate (stage 3) / WeakReferences / Finalizers minimal support
module.exports = () => {
  var fg = new FinalizationGroup(function() {});
  return Object.getPrototypeOf(fg) === FinalizationGroup.prototype;

};