// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.xor
module.exports = () => {
  return simdBoolIntTypes.every(function(type){
    return typeof SIMD[type].xor === 'function';
  });

};