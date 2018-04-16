// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%floatType%.minNum
module.exports = () => {
  return simdFloatTypes.every(function(type){
    return typeof SIMD[type].minNum === 'function';
  });

};