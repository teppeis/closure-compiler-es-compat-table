module.exports = function() {
  return simdFloatTypes.every(function(a) {
    return "function" === typeof SIMD[a].reciprocalSqrtApproximation;
  });
};

