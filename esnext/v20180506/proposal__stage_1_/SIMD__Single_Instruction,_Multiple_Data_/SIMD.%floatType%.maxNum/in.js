// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%floatType%.maxNum
module.exports = () => {
  return simdFloatTypes.every(function(type){
    return typeof SIMD[type].maxNum === 'function';
  });

};