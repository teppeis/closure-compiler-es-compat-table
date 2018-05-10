// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%floatType%.min
module.exports = () => {
  return simdFloatTypes.every(function(type){
    return typeof SIMD[type].min === 'function';
  });

};