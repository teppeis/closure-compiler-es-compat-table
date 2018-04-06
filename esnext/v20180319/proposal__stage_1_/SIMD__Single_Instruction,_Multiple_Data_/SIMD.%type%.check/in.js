// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.check
module.exports = function() {
  return simdAllTypes.every(function(type){
    return typeof SIMD[type].check === 'function';
  });

};