// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / Float32x4
module.exports = function() {
  return typeof SIMD.Float32x4 === 'function';

};