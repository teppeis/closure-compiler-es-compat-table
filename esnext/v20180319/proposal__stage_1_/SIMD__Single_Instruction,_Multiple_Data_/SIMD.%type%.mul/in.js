// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.mul
module.exports = function() {
  return simdFloatIntTypes.every(function(type){
    return typeof SIMD[type].mul === 'function';
  });

};