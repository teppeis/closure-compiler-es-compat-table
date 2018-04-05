// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / Int16x8
module.exports = function() {
  return typeof SIMD.Int16x8 === "function";
};
