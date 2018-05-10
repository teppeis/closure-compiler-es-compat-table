// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.extractLane
module.exports = () => {
  return simdAllTypes.every(function(type){
    return typeof SIMD[type].extractLane === 'function';
  });

};