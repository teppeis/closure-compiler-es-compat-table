// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%integerType%.subSaturate
module.exports = () => {
  return simdSmallIntTypes.every(function(type){
    return typeof SIMD[type].subSaturate === 'function';
  });

};