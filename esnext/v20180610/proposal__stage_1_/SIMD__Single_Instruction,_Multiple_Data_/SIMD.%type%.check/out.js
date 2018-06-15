module.exports = function() {
  return simdAllTypes.every(function(a) {
    return "function" === typeof SIMD[a].check;
  });
};

