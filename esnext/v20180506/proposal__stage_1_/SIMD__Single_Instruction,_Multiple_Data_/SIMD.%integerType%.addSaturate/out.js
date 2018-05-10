module.exports = function() {
  return simdSmallIntTypes.every(function(a) {
    return "function" === typeof SIMD[a].addSaturate;
  });
};

