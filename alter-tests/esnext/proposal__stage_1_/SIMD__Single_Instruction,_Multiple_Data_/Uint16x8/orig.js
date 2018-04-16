// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / Uint16x8
module.exports = () => {
  return typeof SIMD.Uint16x8 === 'function';

};