// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / Int8x16
module.exports = () => {
  return typeof SIMD.Int8x16 === 'function';

};