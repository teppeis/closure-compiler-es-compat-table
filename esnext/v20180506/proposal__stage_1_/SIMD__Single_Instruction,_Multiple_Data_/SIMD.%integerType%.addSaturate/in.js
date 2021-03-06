// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%integerType%.addSaturate
module.exports = () => {
  return simdSmallIntTypes.every(function(type){
    return typeof SIMD[type].addSaturate === 'function';
  });

};