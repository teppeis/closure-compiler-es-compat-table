// 2021 features / WeakReferences / FinalizationRegistry minimal support
module.exports = () => {
  var fr = new FinalizationRegistry(function() {});
  return Object.getPrototypeOf(fr) === FinalizationRegistry.prototype;

};