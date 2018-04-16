// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / Uint32x4
module.exports = () => {
  return typeof SIMD.Uint32x4 === 'function';

};