// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / Bool16x8
module.exports = function() {
  return typeof SIMD.Bool16x8 === "function";
};
