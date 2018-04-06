// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.add
module.exports = function() {
  return simdFloatIntTypes.every(function(type){
    return typeof SIMD[type].add === 'function';
  });

};