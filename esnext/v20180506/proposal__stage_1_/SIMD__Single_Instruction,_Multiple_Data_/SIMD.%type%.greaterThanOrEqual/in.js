// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.greaterThanOrEqual
module.exports = () => {
  return simdFloatIntTypes.every(function(type){
    return typeof SIMD[type].greaterThanOrEqual === 'function';
  });

};