// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%integerType%.shiftRightByScalar
module.exports = function() {
  return simdIntTypes.every(function(type) {
    return typeof SIMD[type].shiftRightByScalar === "function";
  });
};
