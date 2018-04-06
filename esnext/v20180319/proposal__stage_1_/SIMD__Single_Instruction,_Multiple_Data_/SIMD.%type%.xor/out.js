module.exports = function() {
  return simdBoolIntTypes.every(function(a) {
    return "function" === typeof SIMD[a].xor;
  });
};

