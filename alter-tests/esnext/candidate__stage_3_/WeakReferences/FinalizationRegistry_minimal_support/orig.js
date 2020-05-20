// candidate (stage 3) / WeakReferences / FinalizationRegistry minimal support
module.exports = () => {
  var fr = new FinalizationRegistry(function() {});
  return Object.getPrototypeOf(fr) === FinalizationRegistry.prototype;

};