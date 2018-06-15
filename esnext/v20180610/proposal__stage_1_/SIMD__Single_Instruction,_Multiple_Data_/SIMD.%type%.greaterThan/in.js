// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.greaterThan
module.exports = () => {
  return simdFloatIntTypes.every(function(type){
    return typeof SIMD[type].greaterThan === 'function';
  });

};