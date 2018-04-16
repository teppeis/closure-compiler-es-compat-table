// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.select
module.exports = () => {
  return simdFloatIntTypes.every(function(type){
    return typeof SIMD[type].select === 'function';
  });

};