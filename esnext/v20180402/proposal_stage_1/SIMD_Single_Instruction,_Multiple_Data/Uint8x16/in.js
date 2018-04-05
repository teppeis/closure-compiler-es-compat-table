// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / Uint8x16
module.exports = function() {
  return typeof SIMD.Uint8x16 === "function";
};
