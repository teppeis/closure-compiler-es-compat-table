module.exports = function() {
  var a = new FinalizationGroup(function() {
  });
  return Object.getPrototypeOf(a) === FinalizationGroup.prototype;
};

