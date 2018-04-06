module.exports = function() {
  return simdBoolTypes.every(function(a) {
    return "function" === typeof SIMD[a].not;
  });
};

