// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.or
module.exports = () => {
  return simdBoolIntTypes.every(function(type){
    return typeof SIMD[type].or === 'function';
  });

};