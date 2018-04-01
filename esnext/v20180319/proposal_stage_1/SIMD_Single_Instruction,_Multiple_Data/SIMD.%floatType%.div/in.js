// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%floatType%.div
module.exports = function() {
  return simdFloatTypes.every(function(type) {
    return typeof SIMD[type].div === "function";
  });
};
