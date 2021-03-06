// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.store
module.exports = () => {
  return simdFloatIntTypes.every(function(type){
    return typeof SIMD[type].store === 'function';
  });

};