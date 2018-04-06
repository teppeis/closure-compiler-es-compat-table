// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / Bool32x4
module.exports = function() {
  return typeof SIMD.Bool32x4 === 'function';

};