module.exports = function() {
  var a = new FinalizationRegistry(function() {
  });
  return Object.getPrototypeOf(a) === FinalizationRegistry.prototype;
};

