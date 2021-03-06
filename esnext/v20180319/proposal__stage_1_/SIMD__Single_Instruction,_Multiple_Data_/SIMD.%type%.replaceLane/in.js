// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.replaceLane
module.exports = () => {
  return simdAllTypes.every(function(type){
    return typeof SIMD[type].replaceLane === 'function';
  });

};