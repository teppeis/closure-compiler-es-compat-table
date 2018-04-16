// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%booleanType%.allTrue
module.exports = () => {
  return simdBoolTypes.every(function(type){
    return typeof SIMD[type].allTrue === 'function';
  });

};